import type { Page, PageWhere } from "@akasha/pages-core/page-types"
import type { JsonPatch, PageSelect } from "../types/types.module.code.ts"

export type PatchPropertyDefinitionArgs = {
  where: PageWhere
  set: Partial<Page>
  patch?: JsonPatch
  select?: PageSelect
}

export type PatchPropertyDefinitionByIdArgs = {
  id: string
  set: Partial<Page>
  patch?: JsonPatch
  select?: PageSelect
}

class PropertyDefinitionNotPatchable extends Error {
  readonly id: string
  readonly keys: readonly string[]
  constructor(id: string, keys: readonly string[]) {
    const named = keys.length === 0 ? "no keys" : keys.map((k) => `"${k}"`).join(", ")
    super(
      `patchPropertyDefinitionById(${id}): refused, and nothing was written. A property definition is a file in the instructions repo — that is what the page type \`page-property-definition\` is backed by — so there is no row to patch, and this call used to answer null for "no such row" while its callers read that as success. It was asked to set ${named}. A definition file's option set is its \`values:\` key; \`config.options\` is a read-only projection of that key and \`defaultOrder\` is a key no definition file carries, so neither can be written back under that name. Change a property definition through the instructions repo's own gated write path.`
    )
    this.name = "PropertyDefinitionNotPatchable"
    this.id = id
    this.keys = keys
  }
}

export function patchPropertyDefinitionById(
  args: PatchPropertyDefinitionByIdArgs
): Promise<Page | null> {
  return Promise.reject(new PropertyDefinitionNotPatchable(args.id, Object.keys(args.set)))
}
