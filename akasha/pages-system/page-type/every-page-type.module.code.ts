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

export type Extends = {
  page: never
  domain: "page"
  module: "domain"
  command: "module"
  "page-type": "domain"
  "page-property-type": "page-type"
}

export type PageTypeSlug = keyof Extends

type Ancestry<K> = K extends PageTypeSlug ? K | Ancestry<Extends[K]> : never

export type Under<T extends PageTypeSlug> = {
  [K in PageTypeSlug]: T extends Ancestry<K> ? K : never
}[PageTypeSlug]

export type Many<T extends PageTypeSlug> = [Under<T>] extends [T] ? false : true

export type Qualified<T extends PageTypeSlug> = `${Under<T>}/${string}`

export type Value<T extends PageTypeSlug> = Many<T> extends true ? Qualified<T> : string
