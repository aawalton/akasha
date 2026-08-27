import type { FilterConfig as CoreFilterConfig, FilterOperator as CoreFilterOperator, FilterOperatorOption as CoreFilterOperatorOption, PropertyValue as CorePropertyValue } from "@shared/pages-core/property-types/types"
import type { PageDataJSON } from "@shared/pages-core/types"

export type PropertyValue = CorePropertyValue
export type FilterOperator = CoreFilterOperator
export type FilterConfig = CoreFilterConfig
export type FilterOperatorOption = CoreFilterOperatorOption

export interface SelectOption {
  readonly id: string
  readonly label: string
}

export interface CardCallbacks {
  onPropertyChange?: (propertyId: string, value: PropertyValue, eventTimeStamp?: number) => void
  onPageNavigate?: (pageId: string) => void
  onRelationNavigate?: (propertyId: string) => void
  pageHref?: (pageId: string, opts?: { targetPageTypeId?: string }) => string
  relationHref?: (propertyId: string) => string
  onCardNavigate?: () => void
  onCreateOption?: (propertyId: string, label: string) => void
  pageData?: PageDataJSON
}
