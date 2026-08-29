import { module } from "../../code-system/module/module.page-type.ts"
import { command } from "../../command-system/command/command.page-type.ts"
import { domain } from "../../domain-system/domain/domain.page-type.ts"
import { page } from "../page/page.page-type.ts"
import { pagePropertyType } from "../page-property-type/page-property-type.page-type.ts"
import { pageType } from "./page-type.page-type.ts"

export const everyPageType = {
  command,
  domain,
  module,
  page,
  pagePropertyType,
  pageType,
} as const
