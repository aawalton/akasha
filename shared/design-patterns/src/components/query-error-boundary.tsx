"use client"

import { Button } from "@shared/design-primitives/components/button"
import { Card, CardContent } from "@shared/design-primitives/components/card"
import { FolderOpen } from "lucide-react"
import * as React from "react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty"

interface QueryErrorBoundaryProps {
  children: React.ReactNode
}

interface QueryErrorBoundaryState {
  error: Error | null
}

export class QueryErrorBoundary extends React.Component<
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

  render() {
    if (this.state.error) {
      return (
        <Card>
          <CardContent>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderOpen />
                </EmptyMedia>
                <EmptyTitle>Failed to load</EmptyTitle>
                <EmptyDescription>
                  {this.state.error.message !== "" ? this.state.error.message : "An error occurred"}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => this.setState({ error: null })}
                >
                  Try again
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}
