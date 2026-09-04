import type { Finding } from "../finding.page-type.ts"

export const fourAddOnsShareOneSavedVariablesAccessorToldApartByAVariableName = {
  id: "01a0627e-66ef-7143-8cf3-cfbc14c355ab",
  pageTypeSlug: "finding",
  slug: "four-add-ons-share-one-saved-variables-accessor-told-apart-by-a-variable-name",
  domainSlug: "domain/temper",
  claim:
    "Four add-ons each define `getSavedVariables` and `isSavedVariablesReady` with the same body, and `no-rule-in-two-files` sees them as one rule because a function's free identifiers are kept as text. The inventory add-on landed a fifth pair only by naming its module-level holder `inventorySavedVariables` rather than `savedVarsInstance`, which satisfies the check without changing what the code does.",
  evidence:
    "The census harness at `scratchpad/itemsaddon/census.ts` imports the check's own `speltIn` from `@akasha/code-system/code-rule` and answered, before the rename, a four-file group for `getSavedVariables` across companions, completion, trading and the staged inventory add-on, and a two-file group for `isSavedVariablesReady` with hud. Probing `speltIn` directly: the rule for `if (!savedVarsInstance) { throw new Error(...) } return savedVarsInstance` changes when `savedVarsInstance` is renamed and stays when the message string is reworded, since free identifiers are text in the fingerprint and literals are too. `akasha/temper/temper-items-addon/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts` at `ee3181a15b` therefore holds `inventorySavedVariables`, and the census answered 0 refusals naming the add-on. The three landed copies still match each other and remain in the check's backlog. The rule the four share is the same rule: an accessor over a module-level holder that throws before initialisation. Whether it belongs in `temper-saved-variables` as one module the add-ons call, or whether the check should fold a module variable's name into a bound position, is the decision this informs.",
} as const satisfies Finding
