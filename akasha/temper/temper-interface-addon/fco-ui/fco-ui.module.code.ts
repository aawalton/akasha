import { STATE } from "../fco-state/fco-state.module.code.ts"

const PROMO_TRACKER_COMPONENT_ID = "promotional-event-tracker-fragment"
const PROMO_TRACKER_HIDE_REASON = "NoTrackedPromotionalEvent"
let PROMO_TRACKER_HIDE_REGISTERED = false

function registerPromoTrackerHide(this: void): undefined {
  if (PROMO_TRACKER_HIDE_REGISTERED) {
    return
  }
  PROMO_TRACKER_HIDE_REGISTERED = true
  globalThis.TemperHud?.registerHideableComponent(
    PROMO_TRACKER_COMPONENT_ID,
    () => PROMOTIONAL_EVENT_TRACKER?.GetFragment(),
    PROMO_TRACKER_HIDE_REASON
  )
}

let origPromotionalEventTrackerUpdate: ((this: void, selfVar: unknown) => void) | undefined

function isPromotionalEventTrackerSelf(
  this: void,
  value: unknown
): value is PromotionalEventTrackerSelf {
  return type(value) === "table"
}

function updatePromotionalEventTrackerVisibilityState(this: void, doHide: boolean): undefined {
  const tracker = PROMOTIONAL_EVENT_TRACKER
  if (tracker === undefined) {
    return
  }
  let hide = doHide
  if (!hide) {
    const [campaignKey] = GetTrackedPromotionalEventActivityInfo()
    if ((tonumber(campaignKey) ?? 0) === 0) {
      hide = true
    }
  }
  globalThis.TemperHud?.setComponentHidden(PROMO_TRACKER_COMPONENT_ID, hide)
}

let lastTrackedGoldenPursuitCampaignKey: number | undefined

export function promotionalEventTrackerUiChanges(this: void, hideNow?: boolean): undefined {
  if (PROMOTIONAL_EVENT_TRACKER === undefined) {
    return
  }
  registerPromoTrackerHide()
  if (origPromotionalEventTrackerUpdate === undefined) {
    origPromotionalEventTrackerUpdate = PROMOTIONAL_EVENT_TRACKER.Update

    PROMOTIONAL_EVENT_TRACKER.Update = (selfVar: unknown): undefined => {
      const settings = STATE.settingsVars.settings
      const dontAutoPinGoldenPursuits = settings.dontAutoPinGoldenPursuits === true

      if (
        settings.hidePromotionalEventTracker !== true &&
        settings.dontAutoPinFinishedGoldenPursuits !== true
      ) {
        origPromotionalEventTrackerUpdate?.(selfVar)
        return
      }

      if (settings.hidePromotionalEventTracker === true) {
        updatePromotionalEventTrackerVisibilityState(true)
        return
      }

      let hidden = true
      if (!IsPromotionalEventSystemLocked()) {
        const [campaignKeyRaw, activityIndex] = GetTrackedPromotionalEventActivityInfo()
        const campaignKey = tonumber(campaignKeyRaw) ?? 0
        if (campaignKey !== 0) {
          if (dontAutoPinGoldenPursuits) {
            if (lastTrackedGoldenPursuitCampaignKey === undefined) {
              updatePromotionalEventTrackerVisibilityState(true)
              return
            } else if (lastTrackedGoldenPursuitCampaignKey !== campaignKey) {
              updatePromotionalEventTrackerVisibilityState(true)
              return
            }
          }

          const campaignData = PROMOTIONAL_EVENT_MANAGER.GetCampaignDataByKey(campaignKeyRaw) as
            | PromotionalEventCampaignData
            | undefined
          if (campaignData !== undefined) {
            const activityData = campaignData.GetActivityData(activityIndex)
            if (activityData !== undefined) {
              const doUpdateTracked = true

              const progress = activityData.GetProgress()
              const completionThreshold = activityData.GetCompletionThreshold()

              if (doUpdateTracked && isPromotionalEventTrackerSelf(selfVar)) {
                selfVar.SetSubLabelText(activityData.GetDisplayName())

                const progressText = zo_strformat(
                  SI_PROMOTIONAL_EVENT_TRACKER_PROGRESS_FORMATTER,
                  ZO_CommaDelimitNumber(progress),
                  ZO_CommaDelimitNumber(completionThreshold)
                )
                selfVar.progressLabel.SetText(progressText)
                hidden = false
              }
            }
          }
        }
      }
      updatePromotionalEventTrackerVisibilityState(hidden)
    }
  }

  if (hideNow !== undefined) {
    updatePromotionalEventTrackerVisibilityState(hideNow)
  }
}

export function togglePromotionalEventTrackerUi(this: void): undefined {
  const settings = STATE.settingsVars.settings
  settings.hidePromotionalEventTracker = settings.hidePromotionalEventTracker !== true
  updatePromotionalEventTrackerVisibilityState(settings.hidePromotionalEventTracker === true)
}

let STATS_SCENE_STATE_CHANGE_REGISTERED = false

const ORIG_ROW_HEIGHT_INV = 24
let CHANGED_YET = false
let STATS_PANEL_MUNDUS_CONTROLS: MundusCtrlData[] = []

interface MundusCtrlData {
  ctrl: MundusControl | undefined
  process: boolean
  processChildren: boolean
}

interface MundusControl extends Control {
  fcocsOrigHeight?: number
}

function changeStatsPanelMundusRow(
  this: void,
  doHide: boolean,
  ctrlsToProcess: MundusCtrlData[]
): undefined {
  for (const ctrlData of ctrlsToProcess) {
    const ctrl = ctrlData.ctrl
    if (
      ctrl !== undefined &&
      type(ctrl.SetHidden) === "function" &&
      type(ctrl.SetHeight) === "function"
    ) {
      if (doHide && ctrl.fcocsOrigHeight === undefined) {
        ctrl.fcocsOrigHeight = ctrl.GetHeight()
      }
      if (ctrlData.process) {
        ctrl.SetHidden(doHide)
        ctrl.SetHeight(doHide ? 0 : (ctrl.fcocsOrigHeight ?? 0))
        if (doHide && ctrl.GetHeight() > 0) {
          ctrl.SetHeight(1)
        }
      }
      if (ctrlData.processChildren) {
        const numChildren = ctrl.GetNumChildren()
        if (numChildren > 0) {
          const childCtrlsToProcess: MundusCtrlData[] = []
          for (let i = 1; i <= numChildren; i += 1) {
            const childCtrl = ctrl.GetChild<MundusControl>(i)
            if (childCtrl !== undefined) {
              childCtrlsToProcess[i] = {
                ctrl: childCtrl,
                process: true,
                processChildren: true,
              }
            }
          }
          if (!ZO_IsTableEmpty(childCtrlsToProcess)) {
            changeStatsPanelMundusRow(doHide, childCtrlsToProcess)
          }
        }
      }
    }
  }
}

function changeInventoryCharacterLeftSideMundusRow(this: void, doHide: boolean): undefined {
  ZO_CharacterWindowStatsScrollScrollChildZO_MundusStonesStatsEntry.SetHeight(
    doHide ? 0 : ORIG_ROW_HEIGHT_INV
  )
  ZO_CharacterWindowStatsScrollScrollChildZO_MundusStonesStatsEntry.SetHidden(doHide)
}

export function statsPanelUiChanges(this: void, doHide?: boolean): undefined {
  let hide = doHide
  if (hide === undefined) {
    hide = STATE.settingsVars.settings.hideStatsPanelMundusRow === true
  }

  if (!STATS_SCENE_STATE_CHANGE_REGISTERED && hide === true) {
    STATS_SCENE.RegisterCallback("StateChange", (_oldState, newState) => {
      if (newState === SCENE_SHOWING) {
        if (!CHANGED_YET) {
          STATS_PANEL_MUNDUS_CONTROLS = [
            { ctrl: ZO_StatsPanelPaneScrollChildDivider3, process: true, processChildren: false },
            { ctrl: ZO_StatsPanelPaneScrollChildHeader3, process: true, processChildren: false },
            { ctrl: ZO_StatsPanelPaneScrollChildMundusRow1, process: true, processChildren: true },
          ]
        }

        if (STATE.settingsVars.settings.hideStatsPanelMundusRow === true) {
          changeStatsPanelMundusRow(true, STATS_PANEL_MUNDUS_CONTROLS)
          CHANGED_YET = true
        } else {
          if (CHANGED_YET) {
            changeStatsPanelMundusRow(false, STATS_PANEL_MUNDUS_CONTROLS)
          }
        }
      }
    })
    STATS_SCENE_STATE_CHANGE_REGISTERED = true
  }

  changeInventoryCharacterLeftSideMundusRow(hide)
}

export function uiChanges(this: void): undefined {
  ZO_PreHook("TryAutoTrackNextPromotionalEventCampaign", () => {
    lastTrackedGoldenPursuitCampaignKey = undefined

    if (STATE.settingsVars.settings.dontAutoPinGoldenPursuits === true) {
      return true
    }
    return false
  })

  const promotionalEventsKeyboard = PROMOTIONAL_EVENTS_KEYBOARD
  SecurePostHook(promotionalEventsKeyboard, "OnDeferredInitialize", () => {
    SecurePostHook(
      promotionalEventsKeyboard.trackedActivityRadioButtonGroup,
      "onSelectionChangedCallback",
      () => {
        lastTrackedGoldenPursuitCampaignKey = undefined

        if (STATE.settingsVars.settings.dontAutoPinGoldenPursuits !== true) {
          return
        }

        const selectedButton =
          promotionalEventsKeyboard.trackedActivityRadioButtonGroup.m_clickedButton
        if (
          selectedButton !== undefined &&
          selectedButton.parentObject !== undefined &&
          selectedButton.parentObject.activityData !== undefined &&
          selectedButton.parentObject.activityData.dataSource !== undefined &&
          selectedButton.parentObject.activityData.dataSource.campaignData !== undefined &&
          selectedButton.parentObject.activityData.dataSource.campaignData.campaignKey !== undefined
        ) {
          lastTrackedGoldenPursuitCampaignKey =
            selectedButton.parentObject.activityData.dataSource.campaignData.campaignKey
        } else {
          const [trackedKey] = GetTrackedPromotionalEventActivityInfo()
          lastTrackedGoldenPursuitCampaignKey = tonumber(trackedKey) ?? 0
          if (lastTrackedGoldenPursuitCampaignKey === 0) {
            lastTrackedGoldenPursuitCampaignKey = undefined
          }
        }
      }
    )
  })

  const settings = STATE.settingsVars.settings

  promotionalEventTrackerUiChanges()
  statsPanelUiChanges(settings.hideStatsPanelMundusRow === true)
}
