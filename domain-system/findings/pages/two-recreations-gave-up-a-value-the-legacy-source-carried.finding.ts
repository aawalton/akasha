import type { Finding } from "../finding.page-type.ts"

export const twoRecreationsGaveUpAValueTheLegacySourceCarried = {
  id: "01a06341-d9e8-700b-b66f-8845d5a9e2e5",
  pageTypeSlug: "finding",
  slug: "two-recreations-gave-up-a-value-the-legacy-source-carried",
  domainSlug: "domain/temper",
  claim:
    "Two of the five recreations dropped something the legacy source held. The LibSets porter no longer names where its output lands, and the datamining addon's published global no longer states what its one method returns. Neither loss is forced by the akasha paradigm; each is forced by something else being mid-move.",
  evidence:
    "The LibSets porter landed at `497792dfce` as `temper-upstream-data/libsets-data-port`. The legacy `port-data.ts` took `--code-root` and joined a hard-coded `temper/shared-addon-libraries-lib-sets/src/data/generated` onto it, a two-repo dance from when the instructions and the code were separate checkouts. That folder went at `05200f1619` and the twin divides the same data finer, as `lib-sets-gen-*` modules, so no single replacement folder exists to name. The recreation takes `--out-dir` or `LIBSETS_GENERATED_DIR` and refuses without one, rather than guessing at a layout another seat is still settling. The seven `PORT_TARGETS` therefore no longer map one-to-one onto the twin's modules, and whoever finishes the LibSets move owes the porter its destination. `BOOL_PAIR_SPECIFIER` names `@akasha/temper-lib-sets/bool-pair`, which is a guess and is the one line to check first.\n\nThe datamining global landed at `57ffdd2633` as `temper-addon-library-types/temper-data-mining-global`. The legacy `public-api.ts` wrote `declare global` inside the module, where the return type of `getSavedVariables` was `DataMiningPayload` imported from `@akasha/temper-capture-datamining/datamining-payload`. A `declare global` block in a module body is refused, and the declaration files in `temper-addon-library-types` state no imports at all, none of the 147 files there. So the global declares `getSavedVariables: (this: void) => unknown`. The payload type is still exact everywhere inside the addon; only the published global reads as `unknown`.",
} as const satisfies Finding
