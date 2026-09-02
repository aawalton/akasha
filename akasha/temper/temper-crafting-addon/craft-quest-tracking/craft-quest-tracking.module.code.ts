import { STATE } from "../crafting-state/crafting-state.module.code.ts"

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
      if (DolgubonsWrits !== undefined && TemperCrafting_DolgubonsWritsEndpoint !== undefined) {
        const tutorial = WritCreater.savedVars.tutorial
        if (tutorial !== undefined && tutorial !== false) {
          zo_callLater(() => {
            updateQuest(qId)
          }, 1000)
          return
        }
        TemperCrafting_DolgubonsWritsEndpoint.SetText(out)
        TemperCrafting_QuestText.SetText(title + out)
      } else {
        TemperCrafting_QuestText.SetText(title + out)
      }
      return
    }
  }
}
