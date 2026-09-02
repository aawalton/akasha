"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { InputPanelCard } from "@akasha/design-patterns/input-panel-card"
import { cn } from "@akasha/design-primitives/cn"
import { Input } from "@akasha/design-primitives/input"
import { Label } from "@akasha/design-primitives/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { Textarea } from "@akasha/design-primitives/textarea"
import { useState } from "react"

export function ComponentsInputPanels() {
  const [selectValue, setSelectValue] = useState<string>()

  return (
    <>
      {}
      <PanelCard id="ds-inputs" collapsible title="Inputs">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label className="shrink-0">Default</Label>
            <Input
              placeholder="Type something..."
              className="w-[240px]"
              aria-label="Default input example"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label className="shrink-0">Disabled</Label>
            <Input
              placeholder="Disabled input"
              className="w-[240px]"
              disabled
              aria-label="Disabled input example"
            />
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-input-panel-card" collapsible title="Input Panel Card">
        <p className="text-secondary text-sm">
          Two-column grid for labeled settings inputs. Label left, input right. Use save-on-blur (
          <code>onBlur</code>), not Save buttons. Input width:{" "}
          <code>w-full min-w-0 max-w-[240px] bg-surface-2</code>. The <code>description</code> prop
          renders an info icon button (popover) to the left of the input. The <code>error</code>{" "}
          prop renders inline error text below the row.
        </p>
        <InputPanelCard id="ds-input-panel-card-example" title="Example">
          <InputPanelCard.Row
            label="Handle"
            description="3-20 characters. Lowercase letters, numbers, and hyphens."
          >
            <Input
              placeholder="your-handle"
              className={cn("w-full min-w-0 max-w-[240px]", surfaceClass(2))}
              aria-label="Handle input example"
            />
          </InputPanelCard.Row>
          <InputPanelCard.Row label="Email">
            <Input
              value="player@example.com"
              readOnly
              className={cn("w-full min-w-0 max-w-[240px]", surfaceClass(2))}
              aria-label="Email input example"
            />
          </InputPanelCard.Row>
        </InputPanelCard>
      </PanelCard>

      {}
      <PanelCard id="ds-textarea" collapsible title="Textarea">
        <Textarea
          placeholder="Notes about this build, playstyle, rotation tips..."
          className="min-h-[120px] resize-none"
          aria-label="Textarea example"
        />
      </PanelCard>

      {}
      <PanelCard id="ds-select" collapsible title="Select">
        <Select value={selectValue} onValueChange={setSelectValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-secondary text-sm">
          Select dropdown uses surface-3 for the content panel.
        </p>
      </PanelCard>
    </>
  )
}
