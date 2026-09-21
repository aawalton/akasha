import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonLibrary = {
  id: "01a0c454-bad1-7182-842e-d1d0a40d6eb7",
  type: "page-type/domain",
  slug: "temper-addon-library",
  definition: "the libraries temper's add-ons share in the game",
  parts: [
    "temper-addon/temper-lib-media-provider",
    "temper-addon/temper-lib-notification",
    "temper-addon/temper-lib-price",
    "temper-addon/temper-lib-saved-vars",
    "temper-addon/temper-lib-sets",
    "temper-addon/temper-lib-slash-commander",
    "temper-addon/temper-lib-table-functions",
    "temper-addon/temper-lib-treasure",
    "temper-addon/temper-lib-zone",
    "temper-addon/temper-lib-shifter-box",
    "temper-addon/temper-lib-scrollable-menu",
  ],
} as const satisfies Domain
