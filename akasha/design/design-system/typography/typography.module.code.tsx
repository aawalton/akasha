"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { surfaceClass } from "@akasha/design-primitives/surface-class"

export function TypographyPanel() {
  return (
    <PanelCard id="ds-typography" collapsible title="Typography">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className={`space-y-2 rounded-lg p-3 ${surfaceClass(2)}`}>
            <div className="font-mono text-tertiary text-xs">font-sans</div>
            <p className="font-sans text-primary text-sm">Geist Sans</p>
          </div>
          <div className={`space-y-2 rounded-lg p-3 ${surfaceClass(2)}`}>
            <div className="font-mono text-tertiary text-xs">font-mono</div>
            <p className="font-mono text-primary text-sm">Geist Mono</p>
          </div>
        </div>
        <div className={`space-y-2 rounded-lg p-3 ${surfaceClass(2)}`}>
          <div className="flex items-baseline gap-3">
            <span className="w-10 font-mono text-tertiary text-xs">3xl</span>
            <span className="text-3xl text-primary">Display</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="w-10 font-mono text-tertiary text-xs">2xl</span>
            <span className="text-2xl text-primary">Heading 1</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="w-10 font-mono text-tertiary text-xs">xl</span>
            <span className="text-primary text-xl">Heading 2</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="w-10 font-mono text-tertiary text-xs">lg</span>
            <span className="text-lg text-primary">Heading 3</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="w-10 font-mono text-tertiary text-xs">base</span>
            <span className="text-base text-primary">Body</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="w-10 font-mono text-tertiary text-xs">sm</span>
            <span className="text-primary text-sm">Small</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="w-10 font-mono text-tertiary text-xs">xs</span>
            <span className="text-primary text-xs">Caption</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className={`rounded-lg p-3 text-center ${surfaceClass(2)}`}>
            <div className="font-mono text-tertiary text-xs">400</div>
            <p className="font-normal text-primary">Regular</p>
          </div>
          <div className={`rounded-lg p-3 text-center ${surfaceClass(2)}`}>
            <div className="font-mono text-tertiary text-xs">500</div>
            <p className="font-medium text-primary">Medium</p>
          </div>
          <div className={`rounded-lg p-3 text-center ${surfaceClass(2)}`}>
            <div className="font-mono text-tertiary text-xs">700</div>
            <p className="font-bold text-primary">Bold</p>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}
