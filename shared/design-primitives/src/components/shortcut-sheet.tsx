"use client"

import { useState } from "react"
import {
  useKeyboardBinding,
  useKeyboardBindings,
  useShortcutsEnabled,
} from "../hooks/use-keyboard-registry"
import { groupByLayerAndGroup, isChorded } from "../utils/shortcut-surfaces"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { Heading } from "./heading"
import { Label } from "./label"
import { Switch } from "./switch"

const DISABLE_TOGGLE_ID = "disable-keyboard-shortcuts"

export function ShortcutSheet() {
  const [open, setOpen] = useState(false)
  const descriptors = useKeyboardBindings()
  const [enabled, setEnabled] = useShortcutsEnabled()

  useKeyboardBinding({
    id: "house.shortcut-sheet",
    chord: "?",
    label: "Show keyboard shortcuts",
    layer: "conventional",
    onTrigger: () => setOpen(true),
  })

  const sections = groupByLayerAndGroup(descriptors.filter(isChorded))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Every active shortcut, grouped by layer.</DialogDescription>
        </DialogHeader>
        <DialogBody className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto">
          {sections.map((section) => (
            <section key={section.label} className="flex flex-col gap-2">
              <Heading variant="label-muted">{section.label}</Heading>
              {section.groups.map((group) => (
                <div key={group.group ?? "__ungrouped__"} className="flex flex-col gap-1">
                  {group.group !== null && <Heading variant="label">{group.group}</Heading>}
                  {group.descriptors.map((descriptor) => (
                    <div
                      key={descriptor.id}
                      className="flex items-center justify-between gap-4 py-1"
                    >
                      <span className="text-secondary text-sm">{descriptor.label}</span>
                      <kbd className="rounded-sm border border-accent px-1.5 py-0.5 font-medium text-tertiary text-xs">
                        {descriptor.display}
                      </kbd>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </DialogBody>
        <div className="flex items-center justify-between gap-4 border-accent border-t pt-4">
          <Label htmlFor={DISABLE_TOGGLE_ID}>Disable keyboard shortcuts</Label>
          <Switch
            id={DISABLE_TOGGLE_ID}
            checked={!enabled}
            onCheckedChange={(checked) => setEnabled(!checked)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
