export interface ZoneCompletionCatalogActivity {
  name: string
  activityId: number
}

export interface ZoneCompletionCatalogType {
  activities: Record<number, ZoneCompletionCatalogActivity>
}

export interface ZoneCompletionCatalogZone {
  name: string
  completionTypes: Record<number, ZoneCompletionCatalogType>
}
