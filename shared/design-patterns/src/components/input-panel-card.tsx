"use client"

import { PanelCard, type PanelCardProps } from "@akasha/design-layout/panel-card"
import { Button } from "@akasha/design-primitives/button"
import { Label } from "@akasha/design-primitives/label"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { Info } from "lucide-react"
import type * as React from "react"

interface InputPanelCardRowProps {
  label: string
  description?: React.ReactNode
  error?: React.ReactNode
  children: React.ReactNode
}

function InputPanelCardRow({ label, description, error, children }: InputPanelCardRowProps) {
  return (
    <>
      <Label className="pr-6">{label}</Label>
      <div className="flex min-w-0 items-center justify-end gap-1.5">
        {description != null && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="tertiary" size="icon-sm" aria-label="More information">
                <Info className="size-3.5 text-tertiary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="text-secondary text-sm">
              {description}
            </PopoverContent>
          </Popover>
        )}
        {children}
      </div>
      {error != null && <div className="col-span-2 text-right text-orange text-sm">{error}</div>}
    </>
  )
}

interface InputPanelCardComponent extends React.FC<PanelCardProps> {
  Row: typeof InputPanelCardRow
}

export const InputPanelCard: InputPanelCardComponent = ({ children, ...props }: PanelCardProps) => {
  return (
    <PanelCard {...props}>
      <div className="grid grid-cols-[auto_minmax(0,var(--width-input))] items-center gap-x-2 gap-y-2">
        {children}
      </div>
    </PanelCard>
  )
}

InputPanelCard.Row = InputPanelCardRow
