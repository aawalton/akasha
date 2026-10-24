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
  isScheme,
  SCHEMES,
  type Scheme,
} from "akasha/design/interface/system/modules/scheme-choice/scheme-choice.module.code.ts"
import { useEffect } from "react"
import { useFetcher } from "react-router"

const SCHEME_LABELS: Readonly<Record<Scheme, string>> = {
  dark: "Dark",
  light: "Light",
  system: "System",
}

const NOT_SAVED = "Your choice was not saved."

function shownOf(pending: unknown, saved: Scheme): Scheme {
  return isScheme(pending) ? pending : saved
}

function failedIn(data: unknown): boolean {
  return typeof data === "object" && data !== null && "saved" in data && data.saved === false
}

export function AlanSettingsPageContent({ scheme: saved }: { scheme: Scheme }) {
  const surface = useSurface()
  const fetcher = useFetcher()
  const scheme = shownOf(fetcher.formData?.get("scheme"), saved)
  const failed = fetcher.state === "idle" && failedIn(fetcher.data)
  useEffect(() => {
    if (failed) document.documentElement.dataset.schemeChoice = saved
  }, [failed, saved])
  const chooseScheme = (next: Scheme) => {
    document.documentElement.dataset.schemeChoice = next
    fetcher.submit({ scheme: next }, { method: "post", action: "/settings" })
  }

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Settings</PageTitle>
      </PageLayout.Header>

      <PageLayout.Content>
        <ResponsiveColumns>
          <InputPanelCard id="appearance" title="Appearance">
            <InputPanelCard.Row
              label="Color scheme"
              description="System follows each device you sign in on."
              error={failed ? NOT_SAVED : null}
            >
              <Select<Scheme> value={scheme} onValueChange={chooseScheme}>
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
