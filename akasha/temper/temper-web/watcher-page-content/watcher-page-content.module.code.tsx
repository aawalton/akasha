"use client"

import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { LayoutLink } from "@akasha/design-layout/router-context"
import { Button } from "@akasha/design-primitives/button"
import { Card, CardContent } from "@akasha/design-primitives/card"
import { Heading } from "@akasha/design-primitives/heading"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Text } from "@akasha/design-primitives/text-body"
import { FolderDown, MonitorDown } from "lucide-react"
import type { WatcherBuildSummary } from "../watcher-build-status/watcher-build-status.module.code.ts"
import { WatcherBuildStatusCard } from "../watcher-build-status-card/watcher-build-status-card.module.code.tsx"
import type { WatcherRunSummary } from "../watcher-run-status/watcher-run-status.module.code.ts"
import { WatcherRunStatusCard } from "../watcher-run-status-card/watcher-run-status-card.module.code.tsx"
import type { WatcherSyncSummary } from "../watcher-sync-status/watcher-sync-status.module.code.ts"
import { WatcherSyncStatusCard } from "../watcher-sync-status-card/watcher-sync-status-card.module.code.tsx"

const SETUP_STEPS = "list-decimal space-y-3 pl-5 text-sm/relaxed text-secondary"
const REQUIREMENTS = "space-y-3 text-sm/relaxed text-secondary"

export function WatcherPageContent({
  sync,
  build,
  run,
}: {
  sync: WatcherSyncSummary | null
  build: WatcherBuildSummary | null
  run: WatcherRunSummary | null
}) {
  const surface = useSurface()
  const path = `rounded ${surfaceClass(surface + 1)} px-1.5 py-0.5 text-xs`

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Temper Watcher</PageTitle>
      </PageLayout.Header>

      <PageLayout.Content>
        <div className="flex max-w-panel flex-col gap-6">
          {sync !== null && <WatcherSyncStatusCard sync={sync} />}

          {}
          {run !== null && <WatcherRunStatusCard run={run} />}

          {}
          {build !== null && <WatcherBuildStatusCard build={build} />}

          {}
          <Card>
            <CardContent className="flex flex-col gap-4">
              <Text variant="prose">
                The Temper Watcher keeps Temper in sync with your game — your characters,
                companions, inventory, and completion upload themselves in the background, so you
                never have to export a file by hand.
              </Text>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Heading as="h2">What you need first</Heading>
              <ul className={REQUIREMENTS}>
                <li>
                  <strong className="text-primary">The Temper ESO add-ons.</strong> The Watcher does
                  not read the game directly. It reads the SavedVariables files that the Temper
                  add-ons — <strong className="text-primary">TemperCharacters</strong> and{" "}
                  <strong className="text-primary">TemperInventory</strong> — write while you play.
                  Without those add-ons installed in ESO there are no files to read, and nothing
                  will sync no matter how the rest of the setup goes. You download them from Temper,
                  below.
                </li>
                <li>
                  <strong className="text-primary">Tamriel Trade Centre</strong>, for item prices.
                  This one is not ours and is not in our download — it is a separate community
                  add-on whose terms do not allow anyone else to redistribute it, so you install it
                  yourself. It is where Temper gets guild-store prices. Without it Temper still sees
                  every item you own, but it can only value them at what a vendor would pay, which
                  is a small fraction of what they are actually worth. Your item values and
                  affordability all inherit that. Temper tells you on the inventory pages when a
                  sync arrived without it.
                </li>
                <li>
                  <strong className="text-primary">Windows, for the Watcher only.</strong> The
                  Watcher is a Windows 10 or 11 (64-bit) application. There is no macOS or Linux
                  build. The add-ons themselves are just files and work on any system.
                </li>
              </ul>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Heading as="h2">Install the add-ons first</Heading>
              <Button asChild variant="accent" className="w-fit">
                <a href="/api/addons/download" download>
                  <FolderDown className="h-4 w-4" />
                  Download the Temper add-ons
                </a>
              </Button>
              <ol className={SETUP_STEPS}>
                <li>
                  Extract everything in the zip into your ESO add-ons folder,{" "}
                  <code className={path}>Documents\Elder Scrolls Online\live\AddOns</code>. If your
                  Documents folder syncs to OneDrive, the real one is{" "}
                  <code className={path}>OneDrive\Documents\Elder Scrolls Online\live\AddOns</code>{" "}
                  — extracting into the other looks like it worked and changes nothing in game.
                </li>
                <li>
                  Install <strong className="text-primary">Tamriel Trade Centre</strong> yourself,
                  from Minion or from esoui.com. Everything else the Temper add-ons need is already
                  in the zip.
                </li>
                <li>
                  Start ESO and turn the add-ons on at{" "}
                  <strong className="text-primary">Main Menu → Add-Ons</strong>, ticking{" "}
                  <strong className="text-primary">Allow out of date AddOns</strong> if ours are
                  listed as out of date — the versions we declare can lag a fresh ESO patch. An
                  add-on that is installed but not enabled writes nothing, and looks exactly like
                  one that was never installed.
                </li>
                <li>
                  Log in to a character once, so the game writes its SavedVariables files. There is
                  nothing to sync until this has happened.
                </li>
              </ol>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Heading as="h2">Then install the Watcher</Heading>
              <Button asChild variant="accent" className="w-fit">
                <a href="/api/watcher/download" download>
                  <MonitorDown className="h-4 w-4" />
                  Download for Windows
                </a>
              </Button>
              <Text variant="caption">
                Windows 10 or 11 (64-bit). It only reads what the add-ons write, so do those first.
              </Text>
              <ol className={SETUP_STEPS}>
                <li>
                  Run the downloaded <strong className="text-primary">temper-watcher.exe</strong>.
                </li>
                <li>
                  If Windows warns about an unrecognized app, choose{" "}
                  <strong className="text-primary">More info → Run anyway</strong> — the Watcher
                  simply isn't signed yet.
                </li>
                <li>
                  It installs itself: a small icon appears in your system tray, it starts
                  automatically with Windows, and it quietly downloads its background sync helper
                  the first time it runs.
                </li>
                <li>
                  Your browser opens once so you can link the Watcher to your account — make sure
                  you're signed in to Temper first.
                </li>
                <li>
                  Come back to this page and check the status at the top. It tells you whether your
                  data actually reached Temper — linking on its own does not mean anything has
                  arrived.
                </li>
              </ol>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="flex flex-col gap-2">
              <Heading as="h2">Prefer a one-time manual upload?</Heading>
              <Text variant="prose">
                You can{" "}
                <LayoutLink href="/import" className="text-accent hover:underline">
                  upload your SavedVariables file by hand
                </LayoutLink>{" "}
                instead. It works on any operating system, but you'll need to repeat it whenever you
                want Temper to see fresh data — and it needs the same Temper ESO add-ons, since they
                are what create the file you would be uploading.
              </Text>
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
