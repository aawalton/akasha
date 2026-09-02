import type { Finding } from "../finding.page-type.ts"

export const temperSNestedCommandNamesFlattenedIntoOneSlug = {
  id: "01a0603f-86cf-7e54-862b-8c7522e98b90",
  pageTypeSlug: "finding",
  slug: "temper-s-nested-command-names-flattened-into-one-slug",
  domainSlug: "workspace-package/command-system",
  claim:
    "Temper's commands were reached by a path up to four words deep, and akasha reaches a command by one slug. Recreating them turned `ops temper inventory buy-rule create` into `akasha temper-inventory-buy-rule-create`. The grouping is now a naming convention no code reads: nothing lists the commands under one group, nothing gives a group its own help, and 66 entries were added flat to what `akasha --help` prints.",
  evidence:
    "`akasha/command-system/calling/calling.module.code.ts` reads `argv[0]` as the whole command name, looks it up by slug in the index, and hands the rest to that command. A slug is unique among the pages of its page type, so the four `list` commands temper had — under `addon`, `catalog`, `community-addon` and `inventory/rule` — could not each be named `list`. Prefixing the path is what makes them distinct.\n\nThe deepest are four words: `tools/commands/temper/inventory/buy-rule/create.ts` became `temper-inventory-buy-rule-create`, and `tools/commands/temper/addon/bundle/publish.ts` became `temper-addon-bundle-publish`. The longest slug is `temper-inventory-master-consumable-trace` at 40 characters.\n\nAkasha has one way of grouping today, which is an act said as the first argument: `akasha service install <slug>` in `akasha/command-system/command/service/service.command.ts`. Folding temper's 42 inventory commands behind one `temper-inventory` page would have put 42 acts and their arguments into a single `taking` list, losing the per-command definition and help that `akasha <name> --help` gives. One page per command keeps those and gives up the grouping instead.\n\nWhat this costs a reader: `akasha --help` now lists 81 commands rather than 15, in one flat run sorted by slug. The temper ones happen to sort together because they share a prefix, which is luck rather than structure.",
} as const satisfies Finding
