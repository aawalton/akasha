import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"

export const IDLE_PERSONA_CARD_PAGE_TYPE_SLUG = "idle-persona-card"

export const ROSTER_GALLERY_CAPABILITY = "roster-gallery"

export const IDLE_PERSONA_CARD_ICON = "heart"

export const IDLE_LOCK_STATE_UNLOCKED = "unlocked"
export const IDLE_LOCK_STATE_LOCKED = "locked"

export const IDLE_TRAIN_VERB_ID = "train"

export const IDLE_TRAIN10_VERB_ID = "train10"

export const IDLE_TRAINMAX_VERB_ID = "trainMax"

export const IDLE_REMOVE_VERB_ID = "idle-remove"

export const IDLE_LOCK_VERB_ID = "idle-lock"

const IDLE_ACTION_BUTTON_BASES = {
  train: {
    title: "Train",
    type: "action-button",
    config: {
      verbId: IDLE_TRAIN_VERB_ID,
      label: "Train",
      icon: "dumbbell",
      badgeVariant: "yellow",
    },
  },
  train10: {
    title: "+10",
    type: "action-button",
    config: {
      verbId: IDLE_TRAIN10_VERB_ID,
      label: "+10",
      icon: "dumbbell",
      badgeVariant: "yellow",
    },
  },
  trainMax: {
    title: "Max",
    type: "action-button",
    config: {
      verbId: IDLE_TRAINMAX_VERB_ID,
      label: "Max",
      icon: "dumbbell",
      badgeVariant: "yellow",
    },
  },
  remove: {
    title: "Remove",
    type: "action-button",
    config: {
      verbId: IDLE_REMOVE_VERB_ID,
      label: "Remove",
      icon: "x",
      badgeVariant: "elevation-muted",
    },
  },
  lock: {
    title: "Lock",
    type: "action-button",
    config: { verbId: IDLE_LOCK_VERB_ID, label: "Lock", icon: "lock" },
  },
} as const

const DRAWN_AS_URL = ["url-property"] as const

const DRAWN_AS_NUMBER = ["number-property"] as const

const DRAWN_AS_BOOLEAN = ["boolean-property"] as const

const DRAWN_AS_SELECT = ["select-property"] as const

const DRAWN_AS_ACTION_BUTTON = ["action-button-property"] as const

export const IDLE_CARD_PROPERTY_DEFINITIONS: readonly PropertyDefinition[] = [
  { id: "cover", title: "Cover", type: "url", drawnBy: DRAWN_AS_URL },
  {
    id: "stars",
    title: "Stars",
    type: "number",
    drawnBy: DRAWN_AS_NUMBER,
    config: { icon: "star", badgeVariant: "red" },
  },
  { id: "starsDetail", title: "Stars", type: "text", config: { badgeVariant: "red" } },
  { id: "collected", title: "Collected", type: "text", config: {} },
  { id: "seatIndex", title: "Seat Index", type: "number", drawnBy: DRAWN_AS_NUMBER },
  {
    id: "boostedRatePerSec",
    title: "Rate /s",
    type: "number",
    drawnBy: DRAWN_AS_NUMBER,
    config: { format: "short", units: "/s", icon: "heart", badgeVariant: "yellow" },
  },
  {
    id: "ratePerSec",
    title: "Base rate /s",
    type: "number",
    drawnBy: DRAWN_AS_NUMBER,
    config: {
      format: "short",
      units: "/s",
      prefix: "base ",
      icon: "heart",
      badgeVariant: "yellow",
    },
  },
  {
    id: "rank",
    title: "Rank",
    type: "number",
    drawnBy: DRAWN_AS_NUMBER,
    config: { prefix: "Rank ", badgeVariant: "yellow", format: "short" },
  },
  { id: "trainCost", title: "Train Cost", type: "number", drawnBy: DRAWN_AS_NUMBER },
  { id: "train10Cost", title: "Train +10 Cost", type: "number", drawnBy: DRAWN_AS_NUMBER },
  {
    id: "train10Affordable",
    title: "Train +10 Affordable",
    type: "boolean",
    drawnBy: DRAWN_AS_BOOLEAN,
  },
  { id: "trainMaxCount", title: "Train Max Count", type: "number", drawnBy: DRAWN_AS_NUMBER },
  { id: "trainMaxCost", title: "Train Max Cost", type: "number", drawnBy: DRAWN_AS_NUMBER },
  {
    id: "lockState",
    title: "Status",
    type: "select",
    drawnBy: DRAWN_AS_SELECT,
    config: {
      options: [
        { id: IDLE_LOCK_STATE_UNLOCKED, label: "Unlocked" },
        { id: IDLE_LOCK_STATE_LOCKED, label: "Locked" },
      ],
    },
    colorRule: (value) => {
      if (value === IDLE_LOCK_STATE_UNLOCKED) return "green"
      if (value === IDLE_LOCK_STATE_LOCKED) return "default"
      return null
    },
  },
  { id: IDLE_TRAIN_VERB_ID, ...IDLE_ACTION_BUTTON_BASES.train, drawnBy: DRAWN_AS_ACTION_BUTTON },
  {
    id: IDLE_TRAIN10_VERB_ID,
    ...IDLE_ACTION_BUTTON_BASES.train10,
    drawnBy: DRAWN_AS_ACTION_BUTTON,
  },
  {
    id: IDLE_TRAINMAX_VERB_ID,
    ...IDLE_ACTION_BUTTON_BASES.trainMax,
    drawnBy: DRAWN_AS_ACTION_BUTTON,
  },
  { id: "lockEligible", title: "Lock Eligible", type: "boolean", drawnBy: DRAWN_AS_BOOLEAN },
  {
    id: "specializeLocked",
    title: "Specialize Locked",
    type: "boolean",
    drawnBy: DRAWN_AS_BOOLEAN,
  },
  { id: "remove", ...IDLE_ACTION_BUTTON_BASES.remove, drawnBy: DRAWN_AS_ACTION_BUTTON },
  { id: "lock", ...IDLE_ACTION_BUTTON_BASES.lock, drawnBy: DRAWN_AS_ACTION_BUTTON },
]
