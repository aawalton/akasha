import type { Finding } from "../finding.page-type.ts"

export const theEditMarkerFormTakesTheNewlineEndingItsPassage = {
  id: "01a06297-3921-795e-a0a9-67cfda397279",
  pageTypeSlug: "finding",
  slug: "the-edit-marker-form-takes-the-newline-ending-its-passage",
  domainSlug: "workspace-package/command-system",
  claim:
    "The marker form `akasha edit` reads from standard input takes the newline ending a passage's line into the passage. So a passage written there as a fragment matches only where the file breaks the line at exactly that point, which for a fragment it almost never does. The refusal says `matches no passage`, which reads the same whether the text is absent or carries one byte more than the file has.",
  evidence:
    'Measured 2026-09-02 against `tools/lib/check-workflow/territory-map.json` with `--dry-run`, one fragment, four ways. The fragment is the 43 bytes `"package": "akasha/temper/temper-lib-async"`, which the file carries once.\n\nHanded to `--old-file` as 43 bytes with no newline after it, the call is accepted. The same fragment written to a file as 44 bytes, one `\\n` appended and nothing else changed, is refused with `substitution 1 matches no passage`. Written between `<<<<<<< old` and `=======` on standard input, where it necessarily occupies its own line, it is refused with the same sentence. Whole lines through the marker form are accepted, which is how the nine substitutions at `d9a156f291` landed.\n\nThe one byte is the whole difference between the accepted call and the refused one, so nothing else accounts for it.\n\nWhat makes it bite rather than merely surprise: `akasha edit` refuses a call naming one file twice, answering `is named more than once by one call` for each repeat. So several substitutions in one file have no route except the marker form — the only way to do the common thing is the way that mangles fragments. A caller reaching for it writes fragments, because fragments are what `--old-file` taught them to write, and gets a refusal whose wording sends them looking for text that is already there.\n\nThe workaround costs nothing: give whole lines. A whole line matches whether or not the newline is taken, so it is right under either reading.',
} as const satisfies Finding
