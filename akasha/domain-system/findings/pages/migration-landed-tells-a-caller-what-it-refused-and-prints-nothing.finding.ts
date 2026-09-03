import type { Finding } from "../finding.page-type.ts"

export const migrationLandedTellsACallerWhatItRefusedAndPrintsNothing = {
  id: "01a06576-00b3-75ad-8af8-25ba240a5e75",
  pageTypeSlug: "finding",
  slug: "migration-landed-tells-a-caller-what-it-refused-and-prints-nothing",
  domainSlug: "domain/akasha-migration",
  claim:
    "`migrationLanded` returns a full account of what it refused and prints none of it, so a throwaway script that ignores the return value lands a partial migration that reads as a whole one. It happened once tonight, and every lane in this initiative is writing scripts against that helper.",
  evidence:
    "akasha/migration-system/landing/migration-landing.module.code.ts:182 returns `{landed, batches, refused, mistaken, halted, code}` and answers `code: 1` where any batch was refused. It writes nothing to standard output. A caller that runs it for its effect alone therefore sees success whatever happened.\n\nTwo defaults widen the window. `HALTS` is 3 and line 212 counts only refusals in a row, resetting the run to zero after each batch that lands, so a migration whose every other batch is refused never halts and never says so. `FILES` is 200 and `BYTES` is 2,000,000, so a folder of a few hundred files is several batches rather than one, and a partial landing is the ordinary shape of a failure rather than an unusual one.\n\nThe instance: the chess migration's first run had batch 2 of 3 refused, leaving 10 of the 25 games unlanded. What the tree held afterwards was 10 empty page directories, which is the only trace such a failure leaves, and the agent found it by comparing the disk against the plan rather than by anything the run said. A second run landed 40 of 40.\n\nWhat this asks of a caller is small: read `refused`, `halted` and `code` off the answer and say what they hold, and treat `readBack` at line 159 as the check rather than the exit path. What it asks of the helper is a decision someone else owns. The hazard is that the failure is silent and its trace is an empty directory, which no gate judges and which a later agent reads as a folder somebody started.",
} as const satisfies Finding
