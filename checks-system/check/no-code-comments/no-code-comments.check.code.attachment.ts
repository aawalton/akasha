import { readFileSync } from "node:fs"
import { relative, resolve } from "node:path"
import { onceInCall } from "../../../during-call/during-call.ts"
import { isGeneratedFile } from "../../../generated-file/generated-file.ts"
import { type Comment, commentsIn, UnscannableFile } from "../../../tools/code-comment/comments.ts"
import { classify, type Form, formsFrom } from "../../../tools/code-comment/forms.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import type { Check } from "../check-shape.ts"

const FORMS_DOC = "pages/list/code-comment-forms.list.md"

const UNDER_TEST = /(^|\/)__fixtures__(\/|$)/

function formsUnder(root: string): readonly Form[] {
  return onceInCall(`no-code-comments:${root}`, () => formsFrom(readFileSync(resolve(root, FORMS_DOC), "utf8")))
}

export const noCodeComments = {
  slug: "no-code-comments",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    const at = relative(root, path)
    if (UNDER_TEST.test(at)) return []
    const text = decodeUtf8(body)
    if (text === null) return []
    if (isGeneratedFile(at, text)) return []
    let found: readonly Comment[]
    try {
      found = commentsIn(at, text)
    } catch (thrown) {
      if (thrown instanceof UnscannableFile) return []
      throw thrown
    }
    if (found.length === 0) return []
    const forms = formsUnder(root)
    return found
      .map((one) => ({ one, klass: classify(one, at, forms) }))
      .filter((each) => each.klass !== "form")
      .map((each) => `line ${each.one.line} carries ${each.klass}, which is none of the code comment forms`)
  },
} satisfies Check

export default noCodeComments
