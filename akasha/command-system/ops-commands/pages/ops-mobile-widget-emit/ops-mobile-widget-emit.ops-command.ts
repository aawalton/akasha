import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsMobileWidgetEmit = {
  id: "01a06920-37f4-7c4c-8abf-03f06887deda",
  pageTypeSlug: "ops-command",
  slug: "ops-mobile-widget-emit",
  definition:
    "one iOS widget's Swift emitted from its page, diffed against the Swift in the code repository.",
  opsPath: "mobile widget-emit",
  opsEntryFile: "tools/ios-widget-emit.ts",
} as const satisfies OpsCommand
