"use client"

import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { LayoutLink } from "@akasha/design-layout/router-context"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { Button } from "@akasha/design-primitives/button"
import { Card, CardContent } from "@akasha/design-primitives/card"
import { FolderOpen } from "lucide-react"

export function CompletionPageOwnEmpty() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex min-w-0 items-center gap-4">
          <PageTitle>Completion</PageTitle>
        </div>
      </PageLayout.Header>
      <PageLayout.Content>
        <Card>
          <CardContent>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderOpen />
                </EmptyMedia>
                <EmptyTitle>No completion data yet</EmptyTitle>
                <EmptyDescription>
                  Bring in your ESO progress and it fills in here across every character and
                  companion. Install the Watcher to sync automatically on Windows, or import a save
                  manually on any OS.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="accent" asChild>
                  <LayoutLink href="/watcher">Install the Watcher</LayoutLink>
                </Button>
                <Button variant="secondary" asChild>
                  <LayoutLink href="/import">Import manually</LayoutLink>
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      </PageLayout.Content>
    </PageLayout>
  )
}
