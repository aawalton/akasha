"use client"

import { Button } from "@akasha/design-primitives/button"
import { Card, CardContent } from "@akasha/design-primitives/card"
import { FolderOpen } from "lucide-react"
import { Component, type ReactNode } from "react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../empty/empty.module.code.tsx"

type QueryErrorBoundaryProps = {
  children: ReactNode
}

type QueryErrorBoundaryState = {
  error: Error | null
}

const THREW = "An error occurred"

export class QueryErrorBoundary extends Component<
  QueryErrorBoundaryProps,
  QueryErrorBoundaryState
> {
  constructor(props: QueryErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): QueryErrorBoundaryState {
    return { error }
  }

  render(): ReactNode {
    const held = this.state.error
    if (held === null) return this.props.children
    return (
      <Card>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderOpen />
              </EmptyMedia>
              <EmptyTitle>Failed to load</EmptyTitle>
              <EmptyDescription>{held.message === "" ? THREW : held.message}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  this.setState({ error: null })
                }}
              >
                Try again
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    )
  }
}
