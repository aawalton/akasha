import type { Finding } from "../finding.page-type.ts"

export const nothingInAkashaRendersAPageBodyFromItsKeys = {
  id: "01a05b34-b267-7a91-9f6f-c3a8555503d6",
  pageTypeSlug: "finding",
  slug: "nothing-in-akasha-renders-a-page-body-from-its-keys",
  domainSlug: "workspace-package/pages-query",
  claim:
    "Every writer in akasha carries a whole file body. Nothing anywhere turns a page's keys back into the TypeScript that declares them. That is why `writePage`, `patchPage`, `patchState`, `patchPageIfMatch` and the five row names still refuse even now that the store answers a whole body and takes a compare.",
  evidence:
    "`akasha write` takes `--file-path` and `--content-file` and says `a body is a file, never text said on the command line`. `akasha edit` takes a passage and what it becomes, both as files. The store's `POST /write` takes `{path, content}`. `landing` takes `FileEdit = {path, body: Uint8Array | null}`. At no layer does a caller hand over keys.\n\nWhat comes closest is not close. `subagent-standing` builds one page's body from four fields it spells by hand. `value-minting`'s `insertedInto` splices one generated key into source somebody already authored. `declaring` dumps JSON under a fixed export name with no import and no `satisfies`, for tests. The one true keys-to-source pipeline, `pageWith` and `frontOf` under `pages/write`, belongs to the deleted markdown system and emits YAML frontmatter into a `.md`.\n\nThe call taken, Alan being asleep: leave those nine refusing and say the renderer is what is missing, rather than shipping one. A renderer must settle key order, quoting, import lines, the `as const satisfies` tail and biome's formatting, and every one of those is a decision that belongs with the checks rather than inside an HTTP client that states `Nothing here renders a page's body`. Callers that must write a page carry the body, through `writeFiles` or `patchFiles` or the command line. Nothing is blocked by this: the page types those nine names write hold no pages in akasha at all.",
} as const satisfies Finding
