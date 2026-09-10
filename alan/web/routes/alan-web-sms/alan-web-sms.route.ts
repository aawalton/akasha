import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebSms = {
  id: "01a0882b-ae6e-794d-a5d7-05c7668af342",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-sms",
  definition: "the consent a recipient of Amy's texts gives and can take back",
  code: "tsx",
  urlPath: "sms",
} as const satisfies Route
