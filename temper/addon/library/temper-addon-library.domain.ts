import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonLibrary = {
  id: "01a0c454-bad1-7182-842e-d1d0a40d6eb7",
  type: "page-type/domain",
  slug: "temper-addon-library",
  definition: "the libraries temper's add-ons share in the game",
  parts: [
    "temper-addon/temper-lib-table-functions",
    "temper-addon/temper-lib-treasure",
    "temper-addon/temper-lib-zone",
  ],
} as const satisfies Domain
