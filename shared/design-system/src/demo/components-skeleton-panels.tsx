"use client"

import { useState } from "react"
import { ListContentSkeleton } from "@shared/design-layout/components/list-content-skeleton"
import { LoadingContainer } from "@shared/design-layout/components/loading-container"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { SkeletonText } from "@shared/design-layout/components/skeleton-text"
import { Button } from "@shared/design-primitives/components/button"
import { Heading } from "@shared/design-primitives/components/heading"
import { Skeleton } from "@shared/design-primitives/components/skeleton"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

const RADIUS_VARIANTS = ["sm", "md", "lg", "full"] as const

const GAP_VARIANTS = ["tight", "normal", "loose"] as const

export function ComponentsSkeletonPanels() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {}
      <PanelCard id="ds-skeleton" collapsible title="Skeleton">
        <p className="text-secondary text-sm">
          Base skeleton primitive with shimmer animation. Use <code>radius</code> to control
          border-radius: sm, md (default), lg, full.
        </p>
        <div className="space-y-4">
          <div className="space-y-3">
            <Heading>Radius variants</Heading>
            <div className="flex items-center gap-4">
              {RADIUS_VARIANTS.map((radius) => (
                <div key={radius} className="flex flex-col items-center gap-2">
                  <Skeleton
                    radius={radius}
                    className={radius === "full" ? "size-12" : "h-12 w-24"}
                  />
                  <span className="text-secondary text-xs">{radius}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 border-white/10 border-t pt-4">
            <Heading>Common shapes</Heading>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-2">
                <Skeleton radius="full" className="size-10" />
                <span className="text-secondary text-xs">Avatar</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-4 w-32" />
                <span className="text-secondary text-xs">Text line</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <span className="text-secondary text-xs">Button</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-24 w-36 rounded-lg" />
                <span className="text-secondary text-xs">Card</span>
              </div>
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-skeleton-text" collapsible title="SkeletonText">
        <p className="text-secondary text-sm">
          Multi-line text skeleton. Props: <code>lines</code> (default 3), <code>shortenLast</code>{" "}
          (default true), <code>gap</code> (tight / normal / loose).
        </p>
        <div className="space-y-4">
          <div className="space-y-3">
            <Heading>Gap variants</Heading>
            <div className="flex gap-8">
              {GAP_VARIANTS.map((gap) => (
                <div key={gap} className="flex-1 space-y-2">
                  <span className="block text-secondary text-xs">{gap}</span>
                  <SkeletonText gap={gap} lines={3} />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 border-white/10 border-t pt-4">
            <Heading>Line counts</Heading>
            <div className="flex gap-8">
              {[1, 2, 4].map((count) => (
                <div key={count} className="flex-1 space-y-2">
                  <span className="block text-secondary text-xs">
                    {count} line{count > 1 ? "s" : ""}
                  </span>
                  <SkeletonText lines={count} />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 border-white/10 border-t pt-4">
            <Heading>shortenLast: false</Heading>
            <SkeletonText lines={3} shortenLast={false} />
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-list-content-skeleton" collapsible title="ListContentSkeleton">
        <p className="text-secondary text-sm">
          Full-page skeleton for list views. Props: <code>showTabTitle</code> (default true),{" "}
          <code>showFilterBar</code> (default true), <code>filterBarButtonCount</code> (default 3).
        </p>
        <div className="space-y-6">
          <div className="space-y-3">
            <Heading>Default (tab title + filter bar)</Heading>
            <div className={cn("rounded-lg p-4", surfaceClass(0))}>
              <ListContentSkeleton />
            </div>
          </div>
          <div className="space-y-3 border-white/10 border-t pt-4">
            <Heading>Without tab title</Heading>
            <div className={cn("rounded-lg p-4", surfaceClass(0))}>
              <ListContentSkeleton showTabTitle={false} />
            </div>
          </div>
          <div className="space-y-3 border-white/10 border-t pt-4">
            <Heading>Without filter bar</Heading>
            <div className={cn("rounded-lg p-4", surfaceClass(0))}>
              <ListContentSkeleton showFilterBar={false} />
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-loading-container" collapsible title="LoadingContainer">
        <p className="text-secondary text-sm">
          Wraps content with a loading/loaded state toggle. Props: <code>loading</code> (boolean),{" "}
          <code>fallback</code> (skeleton to show), <code>children</code> (loaded content),{" "}
          <code>delay</code> (ms before fallback appears, default 0).
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant={isLoading ? "primary" : "secondary"}
              size="sm"
              onClick={() => setIsLoading((prev) => !prev)}
            >
              {isLoading ? "Show Content" : "Show Loading"}
            </Button>
            <span className="text-secondary text-sm">
              State: {isLoading ? "loading" : "loaded"}
            </span>
          </div>
          <LoadingContainer
            loading={isLoading}
            fallback={
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton radius="full" className="size-10" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <SkeletonText lines={3} />
              </div>
            }
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full text-sm",
                    surfaceClass(2)
                  )}
                >
                  AB
                </div>
                <div>
                  <p className="font-medium text-sm">Alex Builder</p>
                  <p className="text-secondary text-xs">Loaded successfully</p>
                </div>
              </div>
              <p className="text-secondary text-sm">
                This content appears when loading is false. Toggle the button above to switch
                between the skeleton fallback and this loaded state.
              </p>
            </div>
          </LoadingContainer>
        </div>
      </PanelCard>
    </>
  )
}
