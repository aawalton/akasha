"use client"

import { color } from "akasha/design/interface/color/color.page-type.ts"
import { green } from "akasha/design/interface/color/pages/green.color.ts"
import { grey } from "akasha/design/interface/color/pages/grey.color.ts"
import { yellow } from "akasha/design/interface/color/pages/yellow.color.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import type {
  PropertyDefinition,
  PropertyType,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { PropertyBadge } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

interface BadgeSample {
  readonly type: PropertyType
  readonly label?: string
  readonly property: PropertyDefinition
  readonly value: PropertyValue
}

function SampleRows({ samples }: { samples: readonly BadgeSample[] }) {
  return (
    <div className="space-y-4">
      {samples.map((sample) => (
        <div key={sample.property.id} className="flex items-center gap-3">
          <span className="w-32 shrink-0 text-secondary text-sm">
            {sample.label ?? sample.type}
          </span>
          <PropertyBadge property={sample.property} value={sample.value} context="detail" />
        </div>
      ))}
    </div>
  )
}

const COLOR = color.slug

const SELECT_OPTIONS = [
  { id: "draft", label: "Draft", color: namedAs(COLOR, grey.slug, null) },
  { id: "review", label: "In Review", color: namedAs(COLOR, yellow.slug, null) },
  { id: "landed", label: "Landed", color: namedAs(COLOR, green.slug, null) },
]

const TEXT_SAMPLES: readonly BadgeSample[] = [
  {
    type: "text",
    property: {
      id: "ds-property-text",
      title: "Name",
      type: "text",
      drawnBy: ["text-property", "page-property", "domain", "page"],
    },
    value: "Aurora Borealis",
  },
  {
    type: "text",
    label: "text, a list",
    property: {
      id: "ds-property-text-list",
      title: "Aliases",
      type: "text",
      drawnBy: ["text-property", "page-property", "domain", "page"],
    },
    value: ["Aurora Borealis", "Northern Lights"],
  },
  {
    type: "markdown",
    property: {
      id: "ds-property-markdown",
      title: "Notes",
      type: "markdown",
      drawnBy: ["markdown-property", "text-property", "page-property", "domain", "page"],
    },
    value: "**Bold** opening, then the rest of the note.",
  },
  {
    type: "url",
    property: {
      id: "ds-property-url",
      title: "Source",
      type: "url",
      drawnBy: ["url-property", "page-property", "domain", "page"],
    },
    value: "https://akasha.example.com/docs/property-system",
  },
  {
    type: "json",
    property: {
      id: "ds-property-json",
      title: "Shape",
      type: "json",
      drawnBy: ["record-property", "page-property", "domain", "page"],
    },
    value: { engine: "zod", strict: true, fields: ["id", "title"] },
  },
  {
    type: "rich-document",
    property: {
      id: "ds-property-rich-document",
      title: "Body",
      type: "rich-document",
      drawnBy: ["rich-document-property", "page-property", "domain", "page"],
    },
    value: {
      blocks: [
        { id: "one", type: "paragraph", text: "The opening paragraph of a long document." },
        { id: "two", type: "paragraph", text: "A second paragraph the badge never reaches." },
      ],
    },
  },
]

const NUMBER_SAMPLES: readonly BadgeSample[] = [
  {
    type: "number",
    property: {
      id: "ds-property-number",
      title: "Weight",
      type: "number",
      drawnBy: ["number-property", "page-property", "domain", "page"],
      config: { format: "number-with-separators", units: "pts" },
    },
    value: 1240,
  },
  {
    type: "progress",
    property: {
      id: "ds-property-progress",
      title: "Done",
      type: "progress",
      drawnBy: ["temper-task-progress", "page-property", "domain", "page"],
    },
    value: { current: 7, total: 12 },
  },
]

const SELECTION_SAMPLES: readonly BadgeSample[] = [
  {
    type: "select",
    property: {
      id: "ds-property-select",
      title: "Stage",
      type: "select",
      drawnBy: ["select-property", "page-property", "domain", "page"],
      config: { options: SELECT_OPTIONS },
    },
    value: "review",
  },
  {
    type: "multi-select",
    property: {
      id: "ds-property-multi-select",
      title: "Stages",
      type: "multi-select",
      drawnBy: ["multi-select-property", "select-property", "page-property", "domain", "page"],
      config: { options: SELECT_OPTIONS },
    },
    value: ["review", "landed"],
  },
  {
    type: "boolean",
    property: {
      id: "ds-property-boolean",
      title: "Published",
      type: "boolean",
      drawnBy: ["boolean-property", "page-property", "domain", "page"],
    },
    value: true,
  },
]

const DATE_SAMPLES: readonly BadgeSample[] = [
  {
    type: "calendar-date",
    property: {
      id: "ds-property-calendar-date",
      title: "Due",
      type: "calendar-date",
      drawnBy: ["calendar-date-property", "page-property", "domain", "page"],
    },
    value: "2026-03-14",
  },
  {
    type: "calendar-time",
    property: {
      id: "ds-property-calendar-time",
      title: "Starts",
      type: "calendar-time",
      drawnBy: ["calendar-time-property", "page-property", "domain", "page"],
    },
    value: "14:30",
  },
  {
    type: "instant",
    property: {
      id: "ds-property-instant",
      title: "Last Seen",
      type: "instant",
      drawnBy: ["instant-property", "page-property", "domain", "page"],
      config: { format: "relative" },
    },
    value: "2026-03-14T09:20:00.000Z",
  },
  {
    type: "rrule",
    property: {
      id: "ds-property-rrule",
      title: "Repeats",
      type: "rrule",
      drawnBy: ["rrule-property", "page-property", "domain", "page"],
    },
    value: { rule: "FREQ=WEEKLY;BYDAY=MO,WE,FR", anchorFromCompletion: false },
  },
  {
    type: "rrule",
    property: {
      id: "ds-property-rrule-daily",
      title: "Daily Review",
      type: "rrule",
      drawnBy: ["rrule-property", "page-property", "domain", "page"],
    },
    value: { rule: "FREQ=DAILY", anchorFromCompletion: false },
  },
  {
    type: "rrule",
    property: {
      id: "ds-property-rrule-anchored",
      title: "Deep Clean",
      type: "rrule",
      drawnBy: ["rrule-property", "page-property", "domain", "page"],
    },
    value: { rule: "FREQ=WEEKLY;INTERVAL=2", anchorFromCompletion: true },
  },
]

const RELATION_SAMPLES: readonly BadgeSample[] = [
  {
    type: "relation",
    property: {
      id: "ds-property-relation",
      title: "Owner",
      type: "relation",
      drawnBy: ["relation-property", "page-property", "domain", "page"],
    },
    value: { id: "ds-page-crown-of-ember", title: "Crown of Ember" },
  },
  {
    type: "multi-relation",
    property: {
      id: "ds-property-multi-relation",
      title: "Members",
      type: "multi-relation",
      drawnBy: ["multi-relation-property", "relation-property", "page-property", "domain", "page"],
    },
    value: [
      { id: "ds-page-crown-of-ember", title: "Crown of Ember" },
      { id: "ds-page-vault-of-ash", title: "Vault of Ash" },
    ],
  },
  {
    type: "text",
    label: "one-of",
    property: {
      id: "ds-property-one-of",
      title: "Held By",
      type: "text",
      drawnBy: ["one-of-property", "page-property", "domain", "page"],
      memberDrawnBy: [["relation-property", "page-property", "domain", "page"]],
    },
    value: { id: "ds-page-crown-of-ember", title: "Crown of Ember" },
  },
  {
    type: "text",
    label: "one-of, a list",
    property: {
      id: "ds-property-one-of-list",
      title: "Held By",
      type: "text",
      drawnBy: ["one-of-property", "page-property", "domain", "page"],
      memberDrawnBy: [["relation-property", "page-property", "domain", "page"]],
    },
    value: [
      { id: "ds-page-crown-of-ember", title: "Crown of Ember" },
      { id: "ds-page-vault-of-ash", title: "Vault of Ash" },
    ],
  },
]

const ACTION_SAMPLES: readonly BadgeSample[] = [
  {
    type: "action-button",
    property: {
      id: "ds-property-action-button",
      title: "Run Effects",
      type: "action-button",
      drawnBy: ["action-button-property", "page-property", "domain", "page"],
      config: { verbId: "declared-effects", label: "Run Effects" },
    },
    value: null,
  },
]

const EMPTY_SAMPLES: readonly BadgeSample[] = [
  {
    type: "text",
    property: {
      id: "ds-property-empty-text",
      title: "Name",
      type: "text",
      drawnBy: ["text-property", "page-property", "domain", "page"],
    },
    value: null,
  },
  {
    type: "number",
    property: {
      id: "ds-property-empty-number",
      title: "Weight",
      type: "number",
      drawnBy: ["number-property", "page-property", "domain", "page"],
    },
    value: null,
  },
  {
    type: "select",
    property: {
      id: "ds-property-empty-select",
      title: "Stage",
      type: "select",
      drawnBy: ["select-property", "page-property", "domain", "page"],
      config: { options: SELECT_OPTIONS },
    },
    value: null,
  },
  {
    type: "calendar-date",
    property: {
      id: "ds-property-empty-calendar-date",
      title: "Due",
      type: "calendar-date",
      drawnBy: ["calendar-date-property", "page-property", "domain", "page"],
    },
    value: null,
  },
  {
    type: "relation",
    property: {
      id: "ds-property-empty-relation",
      title: "Owner",
      type: "relation",
      drawnBy: ["relation-property", "page-property", "domain", "page"],
    },
    value: null,
  },
  {
    type: "action-button",
    property: {
      id: "ds-property-empty-action-button",
      title: "Run Effects",
      type: "action-button",
      drawnBy: ["action-button-property", "page-property", "domain", "page"],
      config: { verbId: "declared-effects", label: "Run Effects" },
    },
    value: null,
  },
]

export function TextPropertyBadgesPanel() {
  return (
    <PanelCard id="ds-text-property-badges" collapsible title="Text Property Badges">
      <p className="text-secondary text-sm">
        <code>markdown</code>, <code>url</code>, <code>json</code> and <code>rich-document</code>{" "}
        carry a drawing of their own, and plain text falls back to the <code>page-property</code>{" "}
        badge, which draws one badge for each item where the value is a list. A rich document is
        edited in place on the page carrying it, so away from one it reads as its opening line.
      </p>
      <SampleRows samples={TEXT_SAMPLES} />
    </PanelCard>
  )
}

export function NumberPropertyBadgesPanel() {
  return (
    <PanelCard id="ds-number-property-badges" collapsible title="Number Property Badges">
      <p className="text-secondary text-sm">
        The number drawing reads <code>format</code>, <code>prefix</code> and <code>units</code> off
        the property config.
      </p>
      <SampleRows samples={NUMBER_SAMPLES} />
    </PanelCard>
  )
}

export function SelectionPropertyBadgesPanel() {
  return (
    <PanelCard id="ds-selection-property-badges" collapsible title="Selection Property Badges">
      <p className="text-secondary text-sm">
        An option names a color page, and the chip is drawn in the shade the badge keeps for that
        color. <code>multi-select</code> takes the select drawing off the page type it extends, and
        draws a chip for each option chosen.
      </p>
      <SampleRows samples={SELECTION_SAMPLES} />
    </PanelCard>
  )
}

export function DatePropertyBadgesPanel() {
  return (
    <PanelCard id="ds-date-property-badges" collapsible title="Date Property Badges">
      <SampleRows samples={DATE_SAMPLES} />
    </PanelCard>
  )
}

export function RelationPropertyBadgesPanel() {
  return (
    <PanelCard id="ds-relation-property-badges" collapsible title="Relation Property Badges">
      <p className="text-secondary text-sm">
        A relation resolves its name off the page resolver. Away from one it falls back to the title
        carried on the value. A <code>one-of</code> hands its value to the first member that draws
        it, and a list of values one item at a time.
      </p>
      <SampleRows samples={RELATION_SAMPLES} />
    </PanelCard>
  )
}

export function ActionPropertyBadgesPanel() {
  return (
    <PanelCard id="ds-action-property-badges" collapsible title="Action Property Badges">
      <p className="text-secondary text-sm">
        An action button is disabled away from a page, since what it fires wants a page to fire it
        against.
      </p>
      <SampleRows samples={ACTION_SAMPLES} />
    </PanelCard>
  )
}

export function EmptyPropertyBadgesPanel() {
  return (
    <PanelCard id="ds-empty-property-badges" collapsible title="Empty Property Badges">
      <p className="text-secondary text-sm">
        One of each family drawn over an empty value. Only <code>action-button</code> draws itself
        when empty; the rest hand off to the empty badge.
      </p>
      <SampleRows samples={EMPTY_SAMPLES} />
    </PanelCard>
  )
}
