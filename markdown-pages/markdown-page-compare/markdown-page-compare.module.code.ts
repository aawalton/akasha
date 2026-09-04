import { existsSync } from "node:fs"

import { exclusively } from "@akasha/file-system/exclusive"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  diskFileTree,
  type FileTree,
} from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import { attachmentKeysFor } from "../markdown-page-attachment-keys/markdown-page-attachment-keys.module.code.ts"
import { declarationsFor } from "../markdown-page-property-types/markdown-page-property-types.module.code.ts"
import { uncommittedKeysFor } from "../markdown-page-uncommitted-keys/markdown-page-uncommitted-keys.module.code.ts"
import { landAttachments } from "../markdown-page-write/markdown-page-write.module.code.ts"
import { commitAll } from "../markdown-page-write-commit/markdown-page-write-commit.module.code.ts"
import { patchedText } from "../markdown-page-write-compose/markdown-page-write-compose.module.code.ts"
import {
  rewritten,
  statedIn,
  textIn,
} from "../markdown-page-write-text/markdown-page-write-text.module.code.ts"
import {
  splitValues,
  type Value,
} from "../markdown-page-write-values/markdown-page-write-values.module.code.ts"
import {
  type Where,
  whereFor,
} from "../markdown-page-write-where/markdown-page-write-where.module.code.ts"
import {
  readUncommitted,
  uncommittedPathFor,
  writeUncommitted,
} from "../markdown-uncommitted/markdown-uncommitted.module.code.ts"

export type Compared =
  | { readonly outcome: "won"; readonly at: Where; readonly commitError: string | null }
  | {
      readonly outcome: "lost"
      readonly at: Where
      readonly key: string
      readonly expected: string
      readonly found: string
    }
  | { readonly outcome: "absent"; readonly why: string }

function comparableText(one: unknown): string | null {
  if (one === undefined || one === null) return null
  return Array.isArray(one) ? one.join("\n") : String(one)
}

function statedValue(path: string, key: string, uncommitted: boolean): string | null {
  if (uncommitted) return comparableText((readUncommitted(path) ?? {})[key])
  return comparableText(statedIn(textIn(path))[key])
}

export function patchPageIfMatch(
  roots: Roots,
  pageType: string,
  name: string,
  key: string,
  expected: string | null,
  values: Readonly<Record<string, Value>>,
  by?: string,
  clear: readonly string[] = [],
  tree: FileTree = diskFileTree(roots)
): Compared {
  const at = whereFor(roots, pageType, name)
  if (at === null) {
    return {
      outcome: "absent",
      why: `\`${pageType}\` is not a page type this service writes, so \`${key}\` was never compared`,
    }
  }
  const uncommittedKeys = uncommittedKeysFor(tree, pageType)
  const uncommitted = uncommittedKeys.has(key)
  const split = splitValues(roots, pageType, values, tree)
  const uncommittedGone = clear.filter((one) => uncommittedKeys.has(one))
  const alsoUncommitted =
    uncommitted || uncommittedGone.length > 0 || Object.keys(split.uncommitted).length > 0
  const swap = (): Compared => {
    if (!existsSync(at.path)) {
      return {
        outcome: "absent",
        why: `\`${pageType}\` has no page \`${name}\`: nothing stands at ${at.relPath}, so \`${key}\` was never compared`,
      }
    }
    const empty = expected === null
    const found = statedValue(at.path, key, uncommitted)
    if (found === null) {
      if (!empty) {
        return {
          outcome: "absent",
          why: `\`${pageType}/${name}\` states no \`${key}\`, so nothing was compared: naming a key the page does not hold is never a lost race`,
        }
      }
    } else if (empty) {
      return { outcome: "lost", at, key, expected: "", found }
    } else if (found !== expected) {
      return { outcome: "lost", at, key, expected, found }
    }
    const changed = rewritten(
      at.path,
      patchedText(roots, pageType, textIn(at.path), split, at, clear, tree)
    )
    if (Object.keys(split.uncommitted).length > 0 || uncommittedGone.length > 0) {
      const held: Record<string, unknown> = {
        ...(readUncommitted(at.path) ?? {}),
        ...split.uncommitted,
      }
      for (const one of uncommittedGone) delete held[one]
      writeUncommitted(at.path, held)
    }
    const landed = [...(changed ? [at.relPath] : []), ...landAttachments(at, split.attachments)]
    return { outcome: "won", at, commitError: commitAll(at, landed, pageType, "patch", name, by) }
  }
  return exclusively(at.path, () =>
    alsoUncommitted ? exclusively(uncommittedPathFor(at.path), swap) : swap()
  )
}

export interface Said {
  readonly body: unknown
  readonly status: number
}

const PAGE_ID = "id"

export function clearedIn(body: Record<string, unknown> | null): readonly string[] {
  const asked = body?.["clear"]
  if (!Array.isArray(asked)) return []
  return asked
    .filter((one): one is string => typeof one === "string" && one.trim() !== "")
    .map((one) => one.trim())
}

function clearRefusal(
  tree: FileTree,
  pageType: string,
  body: Record<string, unknown> | null,
  values: Record<string, unknown>
): string | null {
  const asked = body?.["clear"]
  if (asked === undefined || asked === null) return null
  if (!Array.isArray(asked) || asked.some((one) => typeof one !== "string" || one.trim() === "")) {
    return "`clear` takes a list of the keys this write takes away, each one the name of a key"
  }
  const declared = declarationsFor(tree, pageType)
  const attachments = attachmentKeysFor(tree, pageType)
  for (const one of clearedIn(body)) {
    if (one === PAGE_ID) {
      return `\`clear\` names \`id\`: a page's id says which page it is, so taking it away mints a different page rather than clearing a value`
    }
    if (one in values) {
      return `\`${one}\` stands in both \`values\` and \`clear\`, which asks to set it and to take it away in one write`
    }
    if (!declared.has(one)) {
      return `\`${pageType}\` declares no \`${one}\`, so clearing it would take nothing away and report that it had`
    }
    if (attachments.has(one)) {
      return `\`${one}\` is an attachment on \`${pageType}\`, so its value stands in a file beside the page rather than among its values`
    }
  }
  return null
}

export function comparedResponse(
  roots: Roots,
  pageType: string,
  name: string,
  body: Record<string, unknown> | null,
  values: Record<string, unknown>,
  writer: string
): Said {
  const key = body?.["if-key"]
  const expected = body?.["if-value"]
  const asksEmpty = body?.["if-empty"]
  if (typeof key !== "string" || key.trim() === "") {
    return {
      body: {
        error:
          "`patch-if` names the key it conditions on in `if-key`, and states either what that key must already hold in `if-value` or `if-empty: true`, which requires that the page hold no such key",
      },
      status: 400,
    }
  }
  if (asksEmpty !== undefined && asksEmpty !== true) {
    return {
      body: {
        error: `\`if-empty\` is either \`true\` or left out: it states that \`${key}\` must hold nothing for this write to land, and there is nothing else for it to say`,
      },
      status: 400,
    }
  }
  if (asksEmpty === true && expected !== undefined) {
    return {
      body: {
        error: `\`patch-if\` states \`if-value\` or \`if-empty\`, never both: one requires \`${key}\` to already hold a value and the other requires it to hold nothing`,
      },
      status: 400,
    }
  }
  if (asksEmpty !== true && typeof expected !== "string") {
    return {
      body: {
        error: `\`patch-if\` takes \`if-value\` as the text \`${key}\` must already hold, or \`if-empty: true\` where it must hold nothing; a compare against neither would land unconditionally`,
      },
      status: 400,
    }
  }
  const wanted = asksEmpty === true ? null : (expected as string)
  const tree = diskFileTree(roots)
  const refused = clearRefusal(tree, pageType, body, values)
  if (refused !== null) return { body: { error: refused }, status: 400 }
  const done = patchPageIfMatch(
    roots,
    pageType,
    name,
    key.trim(),
    wanted,
    values as Record<string, Value>,
    writer,
    clearedIn(body),
    tree
  )
  if (done.outcome === "absent") {
    return { body: { outcome: "absent", error: done.why, pageType, name }, status: 404 }
  }
  if (done.outcome === "lost") {
    const required =
      wanted === null
        ? "and this write required it to hold nothing"
        : `not the \`${done.expected}\` this write required`
    return {
      body: {
        outcome: "lost",
        error: `\`${pageType}/${name}\` moved on: \`${done.key}\` holds \`${done.found}\`, ${required}, so nothing was written`,
        pageType,
        name,
        key: done.key,
        expected: done.expected,
        found: done.found,
      },
      status: 409,
    }
  }
  if (done.commitError !== null) {
    return {
      body: {
        error: `the write landed at ${done.at.relPath} but its commit did not: ${done.commitError}`,
        at: done.at.relPath,
      },
      status: 500,
    }
  }
  return {
    body: { ok: true, outcome: "won", act: "patch-if", pageType, name, at: done.at.relPath },
    status: 200,
  }
}
