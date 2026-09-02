"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { Checkbox } from "@akasha/design-primitives/checkbox"
import { Label } from "@akasha/design-primitives/label"
import { Progress } from "@akasha/design-primitives/progress-bar"
import { RadioGroup, RadioGroupItem } from "@akasha/design-primitives/radio-group"
import { Slider } from "@akasha/design-primitives/slider"
import { Switch } from "@akasha/design-primitives/switch-control"
import { Toggle } from "@akasha/design-primitives/toggle"
import { ToggleGroup, ToggleGroupItem } from "@akasha/design-primitives/toggle-group"
import { useState } from "react"

export function ComponentsFormControlsPanels() {
  const [radioValue, setRadioValue] = useState("option-1")
  const [singleSlider, setSingleSlider] = useState([40])
  const [rangeSlider, setRangeSlider] = useState([20, 80])

  return (
    <>
      {}
      <PanelCard id="ds-checkbox" collapsible title="Checkbox">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox id="checkbox-checked" defaultChecked />
            <Label htmlFor="checkbox-checked">Checked</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="checkbox-unchecked" />
            <Label htmlFor="checkbox-unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="checkbox-disabled" disabled />
            <Label htmlFor="checkbox-disabled">Disabled</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="checkbox-disabled-checked" disabled defaultChecked />
            <Label htmlFor="checkbox-disabled-checked">Disabled checked</Label>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-switch" collapsible title="Switch">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Switch id="switch-on" defaultChecked />
            <Label htmlFor="switch-on">On</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="switch-off" />
            <Label htmlFor="switch-off">Off</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="switch-disabled" disabled />
            <Label htmlFor="switch-disabled">Disabled</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="switch-disabled-on" disabled defaultChecked />
            <Label htmlFor="switch-disabled-on">Disabled on</Label>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-radio-group" collapsible title="Radio Group">
        <div className="space-y-4">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-1" id="radio-1" />
              <Label htmlFor="radio-1">Option 1</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-2" id="radio-2" />
              <Label htmlFor="radio-2">Option 2</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-3" id="radio-3" />
              <Label htmlFor="radio-3">Option 3</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-4" id="radio-4" disabled />
              <Label htmlFor="radio-4">Disabled option</Label>
            </div>
          </RadioGroup>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-slider" collapsible title="Slider">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Single value: {singleSlider[0]}</Label>
            <Slider
              value={singleSlider}
              onValueChange={setSingleSlider}
              min={0}
              max={100}
              aria-label="Single value slider"
            />
          </div>
          <div className="space-y-2">
            <Label>
              Range: {rangeSlider[0]} – {rangeSlider[1]}
            </Label>
            <Slider
              value={rangeSlider}
              onValueChange={setRangeSlider}
              min={0}
              max={100}
              aria-label="Range slider"
            />
          </div>
          <div className="space-y-2">
            <Label>Custom range (0–1000, step 50)</Label>
            <Slider
              defaultValue={[250]}
              min={0}
              max={1000}
              step={50}
              aria-label="Custom range slider"
            />
          </div>
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Slider defaultValue={[50]} disabled aria-label="Disabled slider" />
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-progress" collapsible title="Progress">
        <div className="space-y-4">
          {[0, 25, 50, 75, 100].map((val) => (
            <div key={val} className="space-y-1">
              <span className="text-secondary text-sm">{val}%</span>
              <Progress value={val} aria-label={`Progress at ${val}%`} />
            </div>
          ))}
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-toggle" collapsible title="Toggle">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Toggle aria-label="Default toggle">Default</Toggle>
            <Toggle defaultPressed aria-label="Pressed toggle">
              Pressed
            </Toggle>
            <Toggle disabled aria-label="Disabled toggle">
              Disabled
            </Toggle>
          </div>
          <div className="space-y-3 border-white/10 border-t pt-4">
            <p className="text-secondary text-sm">Elevated variants</p>
            <div className="flex flex-wrap items-center gap-2">
              <Toggle variant="elevation" aria-label="Elevation toggle">
                elevation
              </Toggle>
              <Toggle variant="elevation-muted" aria-label="Elevation-muted toggle">
                elevation-muted
              </Toggle>
              <Toggle variant="surface" aria-label="Surface toggle">
                surface
              </Toggle>
            </div>
          </div>
          <div className="space-y-3 border-white/10 border-t pt-4">
            <p className="text-secondary text-sm">Sizes</p>
            <div className="flex flex-wrap items-center gap-2">
              <Toggle size="sm" aria-label="Small toggle">
                sm
              </Toggle>
              <Toggle size="default" aria-label="Default size toggle">
                default
              </Toggle>
              <Toggle size="lg" aria-label="Large toggle">
                lg
              </Toggle>
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-toggle-group" collapsible title="Toggle Group">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-secondary text-sm">Single selection</p>
            <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
              <ToggleGroupItem value="left" aria-label="Left">
                Left
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center">
                Center
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                Right
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <p className="text-secondary text-sm">Multiple selection</p>
            <ToggleGroup
              type="multiple"
              defaultValue={["bold", "italic"]}
              aria-label="Text formatting"
            >
              <ToggleGroupItem value="bold" aria-label="Bold">
                Bold
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                Italic
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                Underline
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <p className="text-secondary text-sm">Elevated variant</p>
            <ToggleGroup
              type="single"
              variant="elevation"
              defaultValue="a"
              aria-label="Elevated toggle group"
            >
              <ToggleGroupItem value="a" aria-label="Option A">
                A
              </ToggleGroupItem>
              <ToggleGroupItem value="b" aria-label="Option B">
                B
              </ToggleGroupItem>
              <ToggleGroupItem value="c" aria-label="Option C">
                C
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </PanelCard>
    </>
  )
}
