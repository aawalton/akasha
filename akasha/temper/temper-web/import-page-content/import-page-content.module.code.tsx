"use client"

import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { LayoutLink } from "@akasha/design-layout/router-context"
import { Alert, AlertDescription, AlertTitle } from "@akasha/design-primitives/alert"
import { Button } from "@akasha/design-primitives/button"
import { Card, CardContent } from "@akasha/design-primitives/card"
import { cn } from "@akasha/design-primitives/cn"
import { Spinner } from "@akasha/design-primitives/spinner"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { useInventoryImport } from "@akasha/temper-player-inventory-management-ui/use-inventory-import"
import { AlertCircle, CheckCircle2, FileUp, Upload } from "lucide-react"
import {
  ImportSummary,
  InventoryImportSummary,
  importHadCaveats,
} from "../import-summaries/import-summaries.module.code.tsx"
import { useTemperImport } from "../use-temper-import/use-temper-import.module.code.ts"

export function ImportPageContent() {
  const surface = useSurface()
  const path = `rounded ${surfaceClass(surface + 1)} px-1.5 py-0.5 text-xs`
  const userId = useUserId()
  const {
    state,
    dragOver,
    inputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    reset,
  } = useTemperImport()

  const {
    state: inventoryState,
    dragOver: inventoryDragOver,
    inputRef: inventoryInputRef,
    handleFileChange: handleInventoryFileChange,
    handleDrop: handleInventoryDrop,
    handleDragOver: handleInventoryDragOver,
    handleDragLeave: handleInventoryDragLeave,
    reset: resetInventory,
  } = useInventoryImport(userId)

  const isProcessing = state.phase === "reading" || state.phase === "importing"
  const isInventoryProcessing =
    inventoryState.phase === "reading" || inventoryState.phase === "importing"

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Import</PageTitle>
      </PageLayout.Header>

      <PageLayout.Content>
        <div className="flex max-w-panel flex-col gap-6">
          {}
          <Card>
            <CardContent className="space-y-2 text-secondary text-sm">
              <p>
                <strong className="text-primary">
                  These files come from the Temper ESO add-ons.
                </strong>{" "}
                ESO does not write them on its own —{" "}
                <strong className="text-primary">TemperCharacters</strong> and{" "}
                <strong className="text-primary">TemperInventory</strong> create them while you
                play. If those add-ons are not installed in your game, the files below will not
                exist on your computer and there is nothing to upload.
              </p>
              <p>
                <a
                  href="/api/addons/download"
                  download
                  className="text-accent underline underline-offset-4"
                >
                  Download the Temper add-ons
                </a>{" "}
                and extract the zip into{" "}
                <code className={path}>Documents\Elder Scrolls Online\live\AddOns</code> — or{" "}
                <code className={path}>OneDrive\Documents\Elder Scrolls Online\live\AddOns</code>,
                if your Documents folder syncs to OneDrive. Add Tamriel Trade Centre alongside them,
                as below. Then turn everything on at{" "}
                <strong className="text-primary">Main Menu → Add-Ons</strong>, ticking{" "}
                <strong className="text-primary">Allow out of date AddOns</strong> if ours are
                listed as out of date, and log in to a character once. An add-on that is installed
                but not enabled writes nothing.
              </p>
              <p>
                <strong className="text-primary">Item prices need one more add-on.</strong>{" "}
                <strong className="text-primary">Tamriel Trade Centre</strong> is a separate
                community add-on, not one of ours, and its terms do not allow anyone else to
                redistribute it — so it is not in that download, and you install it yourself from
                Minion or esoui.com. It is where Temper gets guild-store prices. TemperInventory
                records whatever prices it finds at scan time, so an inventory captured without it
                uploads fine and then values your items at vendor prices only — a small fraction of
                what they are worth.
              </p>
              <p className="text-tertiary">
                Manual upload and the add-ons themselves work on any operating system. The{" "}
                <LayoutLink href="/watcher" className="text-accent hover:underline">
                  Temper Watcher
                </LayoutLink>{" "}
                does the same thing automatically, on Windows only.
              </p>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="space-y-2 text-secondary text-sm">
              <p>
                Upload your <strong className="text-primary">TemperCharacters.lua</strong> saved
                variables file to import your characters, companions, and completion tracking data.
                It is written by the <strong className="text-primary">TemperCharacters</strong>{" "}
                add-on.
              </p>
              <p className="text-tertiary">
                Default location:{" "}
                <code className={path}>
                  Documents/Elder Scrolls Online/live/SavedVariables/TemperCharacters.lua
                </code>
              </p>
            </CardContent>
          </Card>

          {state.phase === "idle" && (
            <DropZone
              label="Drop your TemperCharacters.lua file here"
              dragOver={dragOver}
              inputRef={inputRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onFileChange={handleFileChange}
            />
          )}

          {state.phase === "reading" && <ProcessingCard message="Reading file..." />}
          {state.phase === "importing" && <ProcessingCard message="Importing data..." />}

          {state.phase === "success" && (
            <>
              {}
              <Alert>
                {importHadCaveats(state.result) ? (
                  <>
                    <AlertCircle className="text-primary" />
                    <AlertTitle>Import complete — with warnings</AlertTitle>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="text-primary" />
                    <AlertTitle>Import complete</AlertTitle>
                  </>
                )}
                <AlertDescription>
                  <ImportSummary result={state.result} />
                </AlertDescription>
              </Alert>
              <Button variant="secondary" onClick={reset} className="w-fit">
                <FileUp className="h-4 w-4" />
                Import Another File
              </Button>
            </>
          )}

          {state.phase === "error" && (
            <>
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Import failed</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
              <Button variant="secondary" onClick={reset} className="w-fit">
                Try Again
              </Button>
            </>
          )}

          {isProcessing && <div className="sr-only pointer-events-none" />}

          {}
          <Card>
            <CardContent className="space-y-2 text-secondary text-sm">
              <p>
                Upload your <strong className="text-primary">TemperInventory.lua</strong> saved
                variables file to import your inventory data for companion gear tracking. It is
                written by the <strong className="text-primary">TemperInventory</strong> add-on.
              </p>
              <p className="text-tertiary">
                Default location:{" "}
                <code className={path}>
                  Documents/Elder Scrolls Online/live/SavedVariables/TemperInventory.lua
                </code>
              </p>
            </CardContent>
          </Card>

          {inventoryState.phase === "idle" && (
            <DropZone
              label="Drop your TemperInventory.lua file here"
              dragOver={inventoryDragOver}
              inputRef={inventoryInputRef}
              onDrop={handleInventoryDrop}
              onDragOver={handleInventoryDragOver}
              onDragLeave={handleInventoryDragLeave}
              onFileChange={handleInventoryFileChange}
            />
          )}

          {inventoryState.phase === "reading" && <ProcessingCard message="Reading file..." />}
          {inventoryState.phase === "importing" && (
            <ProcessingCard message="Importing inventory..." />
          )}

          {inventoryState.phase === "success" && (
            <>
              <Alert>
                <CheckCircle2 className="text-primary" />
                <AlertTitle>Inventory import complete</AlertTitle>
                <AlertDescription>
                  <InventoryImportSummary result={inventoryState.result} />
                </AlertDescription>
              </Alert>
              <Button variant="secondary" onClick={resetInventory} className="w-fit">
                <FileUp className="h-4 w-4" />
                Import Another File
              </Button>
            </>
          )}

          {inventoryState.phase === "error" && (
            <>
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Inventory import failed</AlertTitle>
                <AlertDescription>{inventoryState.message}</AlertDescription>
              </Alert>
              <Button variant="secondary" onClick={resetInventory} className="w-fit">
                Try Again
              </Button>
            </>
          )}

          {isInventoryProcessing && <div className="sr-only pointer-events-none" />}
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}

function DropZone({
  label,
  dragOver,
  inputRef,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
}: {
  label: string
  dragOver: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
  onDrop: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={cn(
        "flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
        dragOver
          ? "border-accent bg-accent/5 text-accent"
          : "border-border text-tertiary hover:border-secondary hover:text-secondary"
      )}
    >
      <Upload className="h-8 w-8" />
      <div className="space-y-1">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs">or click to browse</p>
      </div>
      <input ref={inputRef} type="file" accept=".lua" onChange={onFileChange} className="hidden" />
    </button>
  )
}

function ProcessingCard({ message }: { message: string }) {
  return (
    <Card className="cursor-wait">
      <CardContent className="flex items-center gap-3 text-secondary text-sm">
        <Spinner />
        <span>{message}</span>
      </CardContent>
    </Card>
  )
}
