import type { GuildHistoryCacheCategoryClass } from "akasha/temper/addon/pages/capture-sales/modules/sales-history-category-class-shape/sales-history-category-class-shape.module.code.ts"
import type {
  PerformanceTrackerClassRef,
  ProcessorRef,
} from "akasha/temper/addon/pages/capture-sales/modules/sales-history-category-types/sales-history-category-types.module.code.ts"
import { internal } from "akasha/temper/addon/pages/capture-sales/modules/sales-history-state/sales-history-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"

function asPerformanceTrackerClassRef(value: unknown): PerformanceTrackerClassRef {
  return value as PerformanceTrackerClassRef
}

const GuildHistoryCacheCategory = ZO_InitializingObject.Subclass<GuildHistoryCacheCategoryClass>()
internal.class.GuildHistoryCacheCategory = GuildHistoryCacheCategory

export { GuildHistoryCacheCategory }

GuildHistoryCacheCategory.Initialize = function (this, adapter, requestManager, categoryData) {
  this.adapter = adapter
  this.requestManager = requestManager
  this.categoryData = categoryData
  this.guildId = categoryData.GetGuildData().GetId()
  this.category = categoryData.GetEventCategory()
  this.key = internal.WORLD_NAME + "/" + tostring(this.guildId) + "/" + tostring(this.category)
  this.saveData = adapter.GetOrCreateCacheSaveData(this.key)
  this.performanceTracker = asPerformanceTrackerClassRef(internal.class.PerformanceTracker).New()
  this.unprocessedEventsStartTime = this.saveData.newestManagedEventTime
  this.rangeInfo = []
  this.rangeInfoDirty = true
  this.progressDirty = true
  this.wasLinked = false
  this.processingQueue = []
  this.processors = new LuaTable<ProcessorRef, boolean>()
  this.RefreshManagedRangeInfo()
}
