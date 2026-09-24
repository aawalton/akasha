"use client"

import { color } from "akasha/design/interface/color/color.page-type.ts"
import { grey } from "akasha/design/interface/color/pages/grey.color.ts"
import { yellow } from "akasha/design/interface/color/pages/yellow.color.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { PropertyRow } from "akasha/page/ui/component/modules/property-row/property-row.module.code.tsx"

interface RowSample {
  readonly property: PropertyDefinition
  readonly value: PropertyValue
}

const OPTIONS = [
  { id: "draft", label: "Draft", color: namedAs(color.slug, grey.slug, null) },
  { id: "review", label: "In Review", color: namedAs(color.slug, yellow.slug, null) },
]

const ROW_SAMPLES: readonly RowSample[] = [
  {
    property: {
      id: "ds-row-text",
      title: "Name",
      type: "text",
      drawnBy: ["text-property", "page-property", "domain", "page"],
      icon: "text-align-start",
    },
    value: "Aurora Borealis",
  },
  {
    property: {
      id: "ds-row-number",
      title: "Max Level",
      type: "number",
      drawnBy: ["number-property", "page-property", "domain", "page"],
      icon: "hash",
    },
    value: 55,
  },
  {
    property: {
      id: "ds-row-relation",
      title: "World",
      type: "relation",
      drawnBy: ["relation-property", "page-property", "domain", "page"],
      icon: "arrow-up-right",
    },
    value: { id: "ds-page-the-wandering-inn", title: "The Wandering Inn" },
  },
  {
    property: {
      id: "ds-row-select",
      title: "Stage",
      type: "select",
      drawnBy: ["select-property", "page-property", "domain", "page"],
      config: { options: OPTIONS },
      icon: "circle-chevron-down",
    },
    value: "review",
  },
  {
    property: {
      id: "ds-row-select-uncolored",
      title: "Earlier Stage",
      type: "select",
      drawnBy: ["select-property", "page-property", "domain", "page"],
      config: { options: OPTIONS },
      icon: "circle-chevron-down",
    },
    value: "draft",
  },
  {
    property: {
      id: "ds-row-date",
      title: "Due",
      type: "calendar-date",
      drawnBy: ["calendar-date-property", "page-property", "domain", "page"],
      icon: "calendar",
    },
    value: "2026-03-14",
  },
  {
    property: {
      id: "ds-row-boolean",
      title: "Published",
      type: "boolean",
      drawnBy: ["boolean-property", "page-property", "domain", "page"],
      icon: "square-check",
    },
    value: true,
  },
]

export function PropertyRowsPanel() {
  return (
    <PanelCard id="ds-property-rows" collapsible title="Property Rows">
      <p className="text-secondary text-sm">
        A page lists its properties as rows. Each label is led by the icon its property's page type
        names, and each value starts at one edge past the labels. A value is plain text unless its
        color names a category, as a colored select option's does.
      </p>
      <div className="flex flex-col gap-1">
        {ROW_SAMPLES.map((sample) => (
          <PropertyRow key={sample.property.id} property={sample.property} value={sample.value} />
        ))}
      </div>
    </PanelCard>
  )
}
