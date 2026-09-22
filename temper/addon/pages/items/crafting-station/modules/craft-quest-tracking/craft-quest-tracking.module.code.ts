import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/type/crafting-addon-neighbours/crafting-addon-neighbours.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-3/eso-api-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function updateQuest(qId: number): undefined {
  for (const [, quest] of pairs(STATE.Quest)) {
    if (quest.id === qId) {
      let out = ""
      const title = quest.name + "\n"
      quest.work = {}
      const numConditions = GetJournalQuestNumConditions(qId, 1)
      for (let cId = 1; cId <= numConditions; cId++) {
        const [textRaw, current, maximum] = GetJournalQuestConditionInfo(qId, 1, cId)
        let text: string | undefined = textRaw
        if (text !== undefined && text !== "") {
          if (current === maximum) {
            text = `|c00FF00${text}|r`
          }
          quest.work[cId] = text
          out = out + text + "\n"
        }
      }
      if (
        DolgubonsWrits !== undefined &&
        TemperItemsCrafting_DolgubonsWritsEndpoint !== undefined
      ) {
        const tutorial = WritCreater.savedVars.tutorial
        if (tutorial !== undefined && tutorial !== false) {
          zo_callLater(() => {
            updateQuest(qId)
          }, 1000)
          return
        }
        TemperItemsCrafting_DolgubonsWritsEndpoint.SetText(out)
        TemperItemsCrafting_QuestText.SetText(title + out)
      } else {
        TemperItemsCrafting_QuestText.SetText(title + out)
      }
      return
    }
  }
}
