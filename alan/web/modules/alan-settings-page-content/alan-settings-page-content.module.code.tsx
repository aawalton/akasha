"use client"

import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import {
  chooseScheme,
  SCHEMES,
  type Scheme,
  useScheme,
} from "akasha/design/interface/system/modules/scheme-choice/scheme-choice.module.code.ts"

const SCHEME_LABELS: Readonly<Record<Scheme, string>> = {
  dark: "Dark",
  light: "Light",
  system: "System",
}

export function AlanSettingsPageContent() {
  const surface = useSurface()
  const scheme = useScheme()

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Settings</PageTitle>
      </PageLayout.Header>

      <PageLayout.Content>
        <ResponsiveColumns>
          <InputPanelCard id="appearance" title="Appearance">
            <InputPanelCard.Row label="Color scheme" description="System follows your device.">
              <Select<Scheme> value={scheme ?? undefined} onValueChange={chooseScheme}>
                <SelectTrigger
                  className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SCHEMES.map((one) => (
                    <SelectItem<Scheme> key={one} value={one}>
                      {SCHEME_LABELS[one]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InputPanelCard.Row>
          </InputPanelCard>
        </ResponsiveColumns>
      </PageLayout.Content>
    </PageLayout>
  )
}
