import type { Finding } from "../finding.page-type.ts"

export const removingAModulePageLeavesItsCodeAndItsTestBehind = {
  id: "01a060be-c946-7004-9123-bd06975b62f1",
  pageTypeSlug: "finding",
  slug: "removing-a-module-page-leaves-its-code-and-its-test-behind",
  domainSlug: "workspace-package/pages-system",
  claim:
    "`sidecarsOf` in akasha/markdown-pages/markdown-sidecar/markdown-sidecar.module.code.ts now carries a page's rows, attachment, uncommitted file and sops file for a page of either kind, but it names those tails one by one. akasha's own `besideOf` answers any file property whatever it holds, so a module page's `.module.code.ts` and `.module.test.ts` are files of it that the removal and move commands still leave behind.",
  evidence:
    "Measured 2026-09-02 by running, after the repair at `4c968403de`. For `akasha/pages-system/page/page-beside/page-beside.module.ts`, `besideOf` answers its `.module.code.ts` and its `.module.test.ts`; `sidecarsOf` answers nothing, and a `--dry-run` removal reports `1 removed` and names neither.\n\nThe two calls answer different questions. `besideOf` in page-beside.module.code.ts asks whether a name carries the page's whole name and one part more, which is every file property by its own invariant. `sidecarsOf` holds a table of tails — jsonl and its parts, attachments, `.uncommitted.yaml`, `.uncommitted.ts`, `.sops.yaml` — and a `.code.ts` is in neither the table nor anything the table could grow to hold, because what makes it a file of that page is that `module` declares `code: \"ts\"`.\n\nI did not widen it, and the reason is the point. Taking any one-part tail would make the removal of `tools/lib/foo.ts` carry away `tools/lib/foo.test.ts`, and that is no page at all — akasha's naming grammar holds inside akasha/ and nowhere else. Asking it correctly needs the file-property set, which `heldIn` takes as an argument and which `sidecarsOf` is handed neither of, along with the page-type set that says which `.ts` files are pages in the first place.\n\nThe call taken: filed rather than guessed. The gap is not new — before the repair `sidecarsOf` answered nothing for every akasha page — so nothing got worse, and three of the four shapes now work. Closing it properly means `sidecarsOf` taking the two sets akasha already builds, which is a change to its callers rather than to it.",
} as const satisfies Finding
