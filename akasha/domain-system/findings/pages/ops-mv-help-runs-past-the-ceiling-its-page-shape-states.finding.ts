import type { Finding } from "../finding.page-type.ts"

export const opsMvHelpRunsPastTheCeilingItsPageShapeStates = {
  id: "01a0614b-dae8-7dcd-8aa9-cfecc9f6b39d",
  pageTypeSlug: "finding",
  slug: "ops-mv-help-runs-past-the-ceiling-its-page-shape-states",
  domainSlug: "domain/akasha-migration",
  claim:
    "`ops mv`'s help is 7100 characters and the shape a command document states admits 5000, which is the largest size the ladder carries. It is the only one of the 300 command documents over the line and it is nearly twice the next longest. So either `ops mv` says more than a command's help is meant to say, or the ladder has no size for the command that does the most. Nothing decides that here, and the prose was not cut to make the count go quiet.",
  evidence:
    "Measured 2026-09-02. `pages/page-body-shape/ops-command.page-body-shape.md` states `help: max 3xl`, and `SIZE_3XL = ceiling(5000)` at `akasha/markdown-pages/markdown-document-tokens/markdown-document-tokens.module.code.ts:14` is the top of a ladder that runs xs 50, sm 100, md 200, lg 500, xl 1000, 2xl 2000, 3xl 5000. There is no size above it.\n\nOver every `pages/old-ops-command/*.md` carrying a Help section, the lengths are: `ops mv` 7200, `ops temper-errors-list` 3769, `ops seat-resume` 3746, `ops seat-reset` 2839, `ops loki-logs` 2642. `pages-hold-shape` measures the block at 7100 and refuses exactly one page.\n\nThat prose was not written tonight. It came verbatim out of `DESCRIPTION` in `ops-cli/global/mv/mv-help.ts`, where it had lived since before this move and where no shape rule could see it — `ops mv --help` has been rendering all 7200 characters the whole time. Moving it into the document is what made the length visible, not what made it long.\n\nThe call taken: the help is kept whole. `ops mv` is destructive and repoints other files while it runs; trimming 2100 characters of what it will and will not repoint buys a green advisory and costs the reader the part that says which occurrences refuse the move. `pages-hold-shape` is advisory, so the refusal is a record rather than a stoppage.",
} as const satisfies Finding
