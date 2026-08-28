import type { PropertyDefinition } from "@shared/pages-core/types"
import type { PropSpec } from "@shared/utils-sync/page-type-props"

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

export const IDLE_CARD_PROPS: readonly PropSpec[] = [
  {
    stringId: "persona",
    title: "Persona",
    type: "relation",
    relation: { target: "persona", back: "idleCards" },
  },
  {
    stringId: "stars",
    title: "Stars",
    type: "number",
    config: { icon: "star", badgeVariant: "red" },
  },
  {
    stringId: "seatIndex",
    title: "Seat Index",
    type: "number",
  },
  {
    stringId: "ratePerSec",
    title: "Rate /s",
    type: "number",
    config: { format: "short", units: "/s", icon: "heart", badgeVariant: "yellow" },
  },
  {
    stringId: "rank",
    title: "Rank",
    type: "number",
    config: { prefix: "Rank ", badgeVariant: "yellow", format: "short" },
  },
  {
    stringId: "trainCost",
    title: "Train Cost",
    type: "number",
  },
  {
    stringId: "lockState",
    title: "Status",
    type: "select",
    options: ["Unlocked", "Locked"],
    colorRules: [
      { when: `{value} == "${IDLE_LOCK_STATE_UNLOCKED}"`, variant: "green" },
      { when: `{value} == "${IDLE_LOCK_STATE_LOCKED}"`, variant: "default" },
    ],
  },
  { stringId: IDLE_TRAIN_VERB_ID, ...IDLE_ACTION_BUTTON_BASES.train },
  { stringId: IDLE_TRAIN10_VERB_ID, ...IDLE_ACTION_BUTTON_BASES.train10 },
  { stringId: IDLE_TRAINMAX_VERB_ID, ...IDLE_ACTION_BUTTON_BASES.trainMax },
  {
    stringId: "lockEligible",
    title: "Lock Eligible",
    type: "boolean",
  },
  {
    stringId: "specializeLocked",
    title: "Specialize Locked",
    type: "boolean",
  },
  { stringId: "remove", ...IDLE_ACTION_BUTTON_BASES.remove },
  { stringId: "lock", ...IDLE_ACTION_BUTTON_BASES.lock },
]

const IDLE_CARD_CONTROL_PROPERTY_IDS: readonly string[] = [
  "remove",
  "lock",
  IDLE_TRAIN_VERB_ID,
  IDLE_TRAIN10_VERB_ID,
  IDLE_TRAINMAX_VERB_ID,
]

export const IDLE_CARD_DATA_PROPERTY_IDS: readonly string[] = IDLE_CARD_PROPS.map(
  (p) => p.stringId
).filter((id) => !IDLE_CARD_CONTROL_PROPERTY_IDS.includes(id))

export const IDLE_CARD_PROPERTY_DEFINITIONS: readonly PropertyDefinition[] = [
  { id: "cover", title: "Cover", type: "url" },
  { id: "stars", title: "Stars", type: "number", config: { icon: "star", badgeVariant: "red" } },
  { id: "starsDetail", title: "Stars", type: "text", config: { badgeVariant: "red" } },
  { id: "collected", title: "Collected", type: "text", config: {} },
  { id: "seatIndex", title: "Seat Index", type: "number" },
  {
    id: "boostedRatePerSec",
    title: "Rate /s",
    type: "number",
    config: { format: "short", units: "/s", icon: "heart", badgeVariant: "yellow" },
  },
  {
    id: "ratePerSec",
    title: "Base rate /s",
    type: "number",
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
    config: { prefix: "Rank ", badgeVariant: "yellow", format: "short" },
  },
  { id: "trainCost", title: "Train Cost", type: "number" },
  { id: "train10Cost", title: "Train +10 Cost", type: "number" },
  { id: "train10Affordable", title: "Train +10 Affordable", type: "boolean" },
  { id: "trainMaxCount", title: "Train Max Count", type: "number" },
  { id: "trainMaxCost", title: "Train Max Cost", type: "number" },
  {
    id: "lockState",
    title: "Status",
    type: "select",
    config: {
      options: [
        { id: IDLE_LOCK_STATE_UNLOCKED, label: "Unlocked" },
        { id: IDLE_LOCK_STATE_LOCKED, label: "Locked" },
      ],
    },
    colorRules: [
      { when: `{value} == "${IDLE_LOCK_STATE_UNLOCKED}"`, variant: "green" },
      { when: `{value} == "${IDLE_LOCK_STATE_LOCKED}"`, variant: "default" },
    ],
  },
  { id: IDLE_TRAIN_VERB_ID, ...IDLE_ACTION_BUTTON_BASES.train },
  { id: IDLE_TRAIN10_VERB_ID, ...IDLE_ACTION_BUTTON_BASES.train10 },
  { id: IDLE_TRAINMAX_VERB_ID, ...IDLE_ACTION_BUTTON_BASES.trainMax },
  { id: "lockEligible", title: "Lock Eligible", type: "boolean" },
  { id: "specializeLocked", title: "Specialize Locked", type: "boolean" },
  { id: "remove", ...IDLE_ACTION_BUTTON_BASES.remove },
  { id: "lock", ...IDLE_ACTION_BUTTON_BASES.lock },
]
