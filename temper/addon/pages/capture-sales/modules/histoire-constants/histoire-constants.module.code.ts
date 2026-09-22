export const LIB_IDENTIFIER = "TemperSalesHistory"

export const CALLBACK = {
  INITIALIZED: "SalesHistoryIsReadyForAction",
  CATEGORY_DATA_UPDATED: "SalesHistoryHasUpdatedCategoryData",
  PROCESS_LINKED_EVENTS_STARTED: "SalesHistoryHasStartedProcessingLinkedEvents",
  PROCESS_LINKED_EVENT: "SalesHistoryIsProcessingALinkedEvent",
  PROCESS_LINKED_EVENTS_FINISHED: "SalesHistoryHasFinishedProcessingLinkedEvents",
  PROCESS_MISSED_EVENTS_STARTED: "SalesHistoryHasStartedProcessingMissedEvents",
  PROCESS_MISSED_EVENT: "SalesHistoryIsProcessingAMissedEvent",
  PROCESS_MISSED_EVENTS_FINISHED: "SalesHistoryHasFinishedProcessingMissedEvents",
  SELECTED_CATEGORY_CACHE_CHANGED: "SalesHistoryDetectedTheSelectedCategoryCacheHasChanged",
  REQUEST_MODE_CHANGED: "SalesHistoryDetectedTheRequestModeHasChanged",
  ZOOM_MODE_CHANGED: "SalesHistoryDetectedTheZoomModeHasChanged",
  REQUEST_CREATED: "SalesHistoryHasCreatedARequest",
  REQUEST_DESTROYED: "SalesHistoryHasDestroyedARequest",
  MANAGED_RANGE_LOST: "SalesHistoryDetectedTheManagedRangeHasBeenLost",
  MANAGED_RANGE_FOUND: "SalesHistoryDetectedTheManagedRangeHasBeenFound",
  CATEGORY_LINKED: "SalesHistoryDetectedACategoryHasBeenLinked",
  DEPRECATED: "deprecated",
} as const

export const REQUEST_MODE_AUTO = "auto"
export const REQUEST_MODE_OFF = "off"
export const REQUEST_MODE_ON = "on"

export const ZOOM_MODE_AUTO = "auto"
export const ZOOM_MODE_FULL_RANGE = "full"
export const ZOOM_MODE_MISSING_RANGE = "missing"

export const STOP_REASON_MANUAL_STOP = "manualStop"
export const STOP_REASON_LAST_CACHED_EVENT_REACHED = "lastCachedEventReached"
export const STOP_REASON_ITERATION_COMPLETED = "iterationCompleted"
export const STOP_REASON_MANAGED_RANGE_LOST = "managedRangeLost"
