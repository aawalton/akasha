import { GuildHistoryCacheCategory } from "akasha/temper/addon/pages/capture-sales/modules/sales-history-category-class/sales-history-category-class.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

GuildHistoryCacheCategory.RegisterProcessor = function (this, processor) {
  this.saveData.lastProcessorRegisteredTime = GetTimeStamp()
  this.processors.set(processor, true)
}

GuildHistoryCacheCategory.UnregisterProcessor = function (this, processor) {
  this.processors.delete(processor)
}

GuildHistoryCacheCategory.GetProcessorInfo = function (this) {
  const names: string[] = []
  let legacyCount = 0
  for (const [processor] of pairs(this.processors)) {
    if (processor.GetAddonName != null) {
      names[names.length] = processor.GetAddonName()
    } else {
      legacyCount = legacyCount + 1
    }
  }
  return $multi(names, legacyCount, this.saveData.lastProcessorRegisteredTime)
}
