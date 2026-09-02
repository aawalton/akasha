import type { Finding } from "../finding.page-type.ts"

export const aFilesOnlyAblationLeavesAnExportRowThatRefusesEveryWrite = {
  id: "01a06384-16f8-7152-9eb4-a35fe65a44c0",
  pageTypeSlug: "finding",
  slug: "a-files-only-ablation-leaves-an-export-row-that-refuses-every-write",
  domainSlug: "domain/akasha",
  claim:
    "`akasha remove` takes files away and leaves every manifest row that named them, so an ablation that looks clean leaves the removed package's own `package.json` exports reaching nothing. Every write in the repository is then refused, for every seat, on a manifest none of them touched, while the seat that landed the removal sees success. A removal should refuse while a tracked manifest row names what goes, the target's own export rows as well as another package's dependency rows.",
  evidence:
    "`387a8ccb47` (09-01 01:22) added the export row `./file-detail-config` together with both module files. `a83c53629a` (09-02 12:28:58), whose subject says the detail config file reader nothing calls goes, deleted the two module files and left the row. Every write in the repository was refused from then until `41661ecc0d` (12:30:45) took the row out: one minute forty-seven seconds of total swarm blockage from a files-only ablation. Read against the code at `56c708520b`: `remove.command.code.ts` builds its changes from the paths that go, `unnamingFor` mends only page-property lists inside `akasha/`, and `workspacingFor` reaches only the root manifest's `workspaces` array. No part of the command reads an `exports`, `dependencies`, `devDependencies` or `peerDependencies` object, so no row naming what goes is ever seen. The dependents' half is the same gap from the other side: about twelve seats hand-edited dependency rows in separate commits, and two manifests were broken by taking the last entry out of a `dependencies` object and leaving the comma before it. `remove-workspacing.module.code.ts` already holds most of the shape a fix wants, since `listEntrySpan` cuts one array entry with its trailing comma and parses the JSON rather than editing lines, but it has no object-property twin, and that twin is the harder one: taking the last property out of an object must absorb the comma before it rather than after. A fix must re-parse what it wrote, since a manifest that will not parse is the outage this finding is about.",
} as const satisfies Finding
