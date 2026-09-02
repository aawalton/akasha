import type { CatalogPayload } from "../catalog-payload/catalog-payload.module.code.ts"

let savedVariablesAccessor: ((this: void) => CatalogPayload) | undefined

export function setCatalogSavedVariablesAccessor(
  this: void,
  accessor: (this: void) => CatalogPayload
): undefined {
  savedVariablesAccessor = accessor
}

export function getSavedVariables(this: void): CatalogPayload {
  if (savedVariablesAccessor === undefined) {
    throw new Error("TemperCatalog saved-variables accessor not set — init has not run.")
  }
  return savedVariablesAccessor()
}
