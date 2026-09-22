import * as Characters from "akasha/temper/addon/pages/items/crafting-station/modules/craft-characters/craft-characters.module.code.ts"
import { defined } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-defined/craft-defined.module.code.ts"
import { CB_UPDATE_PLAYER } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-constants/crafting-constants.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-manager/eso-addon-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-provisioner-station/eso-provisioner-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export interface TimerEntry {
  id: string
  info: string
  time: number
}

export let TIMER: TimerEntry[] = []

export let LAST_QUEUE_TIME = 0

export let CSLOOT: ObjectPool<InspirationContainer> | undefined

export function scrollText(): undefined {
  function drawControl(pool: ObjectPool<InspirationContainer>): InspirationContainer {
    const container = TemperItemsCrafting_QuestFrame.CreateControl<InspirationContainer>(
      `TemperItemsCrafting_Inspiration${pool.GetNextControlId()}`,
      CT_CONTROL
    )
    const c = container.CreateControl<LabelControl>("$(parent)Loot", CT_LABEL)
    c.SetFont("TemperItemsCraftingInsp")
    c.SetColor(1, 1, 1, 1)
    c.SetAnchor(1, container, 1, 0, 0)
    container.c = c
    return container
  }
  function clearControl(c: InspirationContainer): undefined {
    c.SetHidden(true)
    c.ClearAnchors()
  }
  CSLOOT = ZO_ObjectPool.New(drawControl, clearControl)
}

export function slide(
  c: Control,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  duration: number
): undefined {
  const a = ANIMATION_MANAGER.CreateTimeline() as SlideTimeline
  const s = a.InsertAnimation(ANIMATION_TRANSLATE, c)
  const fi = a.InsertAnimation(ANIMATION_ALPHA, c)
  const fo = a.InsertAnimation(ANIMATION_ALPHA, c, duration - 500)
  fi.SetAlphaValues(0, 1)
  fi.SetDuration(10)
  s.SetStartOffsetX(x1)
  s.SetStartOffsetY(y1)
  s.SetEndOffsetX(x2)
  s.SetEndOffsetY(y2)
  s.SetDuration(duration)
  fo.SetAlphaValues(1, 0)
  fo.SetDuration(500)
  a.PlayFromStart()
}

export function isPerfectPixelEnabled(): boolean {
  const addonManager = GetAddOnManager()
  const numAddOns = addonManager.GetNumAddOns()
  for (let i = 1; i <= numAddOns; i++) {
    const [name, , addOnState] = addonManager.GetAddOnInfo(i)
    if (name === "PerfectPixel" && addOnState === "enabled") {
      return true
    }
  }
  return false
}

export function queue(): undefined {
  if (STATE.Init === true) {
    const currentTime = GetTimeStamp()
    if (currentTime - LAST_QUEUE_TIME < 5) {
      return
    }
    LAST_QUEUE_TIME = currentTime

    if (
      STATE.Account.options.timeralarm !== 4 ||
      STATE.Account.options.mountalarm !== 4 ||
      STATE.Account.options.researchalarm !== 4
    ) {
      for (const [x, job] of ipairs(TIMER)) {
        if (GetDiffBetweenTimeStamps(job.time, GetTimeStamp()) <= 0) {
          let alarm: "mount" | "research" | "timer" | undefined
          const [isMount] = string.find(job.id, "^%$M")
          if (isMount !== undefined) {
            alarm = "mount"
          } else {
            const [isResearch] = string.find(job.id, "^%$R")
            if (isResearch !== undefined) {
              alarm = "research"
            } else if (job.id === "AccountTimer12" || job.id === "AccountTimer24") {
              alarm = "timer"
            }
          }

          if (
            (alarm === "timer" &&
              (STATE.Account.options.timeralarm === 2 || STATE.Account.options.timeralarm === 3)) ||
            (alarm === "mount" &&
              (STATE.Account.options.mountalarm === 2 || STATE.Account.options.mountalarm === 3)) ||
            (alarm === "research" &&
              (STATE.Account.options.researchalarm === 2 ||
                STATE.Account.options.researchalarm === 3))
          ) {
            STATE.Chat.Print(job.info)
          }

          if (
            (alarm === "timer" &&
              (STATE.Account.options.timeralarm === 1 || STATE.Account.options.timeralarm === 3)) ||
            (alarm === "mount" &&
              (STATE.Account.options.mountalarm === 1 || STATE.Account.options.mountalarm === 3)) ||
            (alarm === "research" &&
              (STATE.Account.options.researchalarm === 1 ||
                STATE.Account.options.researchalarm === 3))
          ) {
            PlaySound("Smithing_Finish_Research")
            TemperItemsCrafting_Alarm.AddMessage(job.info, 1, 0.66, 0.2, 1)
            TemperItemsCrafting_Alarm.AddMessage("|t10:10:x.dds|t", 0, 0, 0, 1)
          }

          if (
            (alarm === "timer" && STATE.Account.options.timeralarm !== 4) ||
            (alarm === "mount" && STATE.Account.options.mountalarm !== 4) ||
            (alarm === "research" && STATE.Account.options.researchalarm !== 4)
          ) {
            STATE.Account.announce[job.id] = GetTimeStamp()
          }

          TIMER.splice(x - 1, 1)
        }
      }
    }

    if (ZO_Provisioner_IsSceneShowing() && STATE.Account.options.usecook === true) {
      ZO_ProvisionerTopLevelTooltip.SetHidden(true)
      if (isPerfectPixelEnabled() === true) {
        ZO_ProvisionerTopLevel.SetHidden(true)
        ZO_ProvisionerTopLevelDetailsDivider.SetHidden(false)
        ZO_ProvisionerTopLevelDetails.SetHidden(false)
      }
    }

    if (STATE.Inspiration !== "") {
      if (
        STATE.Account.options.inspirationgain === true ||
        STATE.Account.options.inspirationgain === undefined
      ) {
        const pool = CSLOOT
        if (pool !== undefined) {
          const [c, x] = pool.AcquireObject()
          c.SetHidden(false)
          c.SetAnchor(128, TemperItemsCrafting_QuestFrame, 128, 0, 0)
          const loot = defined(c.GetChild<LabelControl>(1))
          loot.SetText(STATE.Inspiration)
          slide(c, 0, 20, 0, GuiRoot.GetHeight() / 2 - 180, 3500)
          zo_callLater(() => pool.ReleaseObject(x), 3510)
        }
      }
      STATE.Inspiration = ""
    }
  }
}

export function getTimer(): undefined {
  if (
    STATE.Account.options.timeralarm === 4 &&
    STATE.Account.options.mountalarm === 4 &&
    STATE.Account.options.researchalarm === 4
  ) {
    return
  }
  CALLBACK_MANAGER.FireCallbacks(CB_UPDATE_PLAYER)
  TIMER = []
  for (const [, x] of pairs(STATE.Account.announce)) {
    if (x + 3600 > GetTimeStamp()) {
    }
  }
  if (defined(STATE.Account.timer[12]) > 0) {
    TIMER.push({
      id: "AccountTimer12",
      info: STATE.Loc.finish12,
      time: defined(STATE.Account.timer[12]),
    })
  }
  if (defined(STATE.Account.timer[24]) > 0) {
    TIMER.push({
      id: "AccountTimer24",
      info: STATE.Loc.finish24,
      time: defined(STATE.Account.timer[24]),
    })
  }
  const crafts = [
    CRAFTING_TYPE_BLACKSMITHING,
    CRAFTING_TYPE_CLOTHIER,
    CRAFTING_TYPE_WOODWORKING,
    CRAFTING_TYPE_JEWELRYCRAFTING,
  ]
  for (const char of Characters.getCharacters()) {
    const player = STATE.Account.player[char]
    if (player === undefined) {
      continue
    }
    if (player.mount.time > 1) {
      TIMER.push({
        info: zo_strformat(STATE.Loc.finishMount, char),
        id: `$M${char}`,
        time: player.mount.time,
      })
    }
    for (const craft of crafts) {
      const numLines = GetNumSmithingResearchLines(craft)
      for (let line = 1; line <= numLines; line++) {
        for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
          const researchTs = STATE.Data.crafting.researched[char]?.[craft]?.[line]?.[trait] ?? false
          if (researchTs !== true && researchTs !== false) {
            if (researchTs > 1) {
              const [traitType] = GetSmithingResearchLineTraitInfo(craft, line, trait)
              const [lineName] = GetSmithingResearchLineInfo(craft, line)
              TIMER.push({
                id: `$R${char}${craft}${line}${trait}`,
                info: zo_strformat(
                  STATE.Loc.finishResearch,
                  char,
                  GetString("SI_ITEMTRAITTYPE", traitType),
                  lineName
                ),
                time: researchTs,
              })
            }
          }
        }
      }
    }
  }
}
