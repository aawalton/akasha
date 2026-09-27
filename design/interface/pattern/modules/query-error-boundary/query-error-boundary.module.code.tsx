"use client"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { FolderOpen } from "lucide-react"
import { Component, type ErrorInfo, type ReactNode } from "react"

type QueryErrorBoundaryWording = {
  readonly title: string
  readonly description: string
  readonly retry: string
}

type QueryErrorBoundaryProps = {
  children: ReactNode
  wording: QueryErrorBoundaryWording
}

type QueryErrorBoundaryState = {
  error: Error | null
}

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

  componentDidCatch(error: Error, info: ErrorInfo): undefined {
    console.error("[query-error-boundary] content failed to load:", error, info.componentStack)
  }

  render(): ReactNode {
    const held = this.state.error
    if (held === null) return this.props.children
    const { wording } = this.props
    return (
      <Card>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderOpen />
              </EmptyMedia>
              <EmptyTitle>{wording.title}</EmptyTitle>
              <EmptyDescription>{wording.description}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  this.setState({ error: null })
                }}
              >
                {wording.retry}
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    )
  }
}
