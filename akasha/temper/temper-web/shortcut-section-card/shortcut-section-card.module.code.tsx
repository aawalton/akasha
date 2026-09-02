import { PanelCard } from "@akasha/design-layout/panel-card"
import { Kbd, KbdGroup } from "@akasha/design-patterns/kbd"
import type { SHORTCUT_GROUPS } from "../keyboard-shortcuts-data/keyboard-shortcuts-data.module.code.ts"

interface ShortcutSectionCardProps {
  group: (typeof SHORTCUT_GROUPS)[number]
  isMac: boolean
}

export function ShortcutSectionCard({ group, isMac }: ShortcutSectionCardProps) {
  return (
    <PanelCard
      id={`shortcuts-${group.title.toLowerCase().replace(/\s+/g, "-")}`}
      title={group.title}
    >
      <div className="flex flex-col gap-3">
        {group.shortcuts.map((shortcut) => (
          <div key={shortcut.description} className="flex items-center justify-between gap-4">
            <span className="text-secondary text-sm">{shortcut.description}</span>
            <div className="flex shrink-0 items-center gap-2">
              {shortcut.keys.map((combo, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  {i > 0 && <span className="text-tertiary text-xs">or</span>}
                  <KbdGroup>
                    {(isMac ? combo.mac : combo.win).map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}
