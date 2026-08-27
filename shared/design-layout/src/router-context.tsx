"use client"

import { type ComponentType, createContext, type ReactNode, useContext } from "react"

export interface LayoutSearchParams {
  readonly get: (name: string) => string | null
  readonly toString: () => string
}

export interface LayoutRouter {
  readonly pathname: string
  readonly searchParams: LayoutSearchParams
}

const LayoutRouterContext = createContext<LayoutRouter | null>(null)

export function LayoutRouterProvider({
  value,
  children,
}: {
  value: LayoutRouter
  children: ReactNode
}) {
  return <LayoutRouterContext.Provider value={value}>{children}</LayoutRouterContext.Provider>
}

export function useLayoutRouter(): LayoutRouter {
  const value = useContext(LayoutRouterContext)
  if (value === null) {
    throw new Error(
      "Missing <LayoutRouterProvider>. Mount it in your app-shell with a value derived from the host router (react-router)."
    )
  }
  return value
}

export function useLayoutPathname(): string {
  return useLayoutRouter().pathname
}

export function useLayoutSearchParams(): LayoutSearchParams {
  return useLayoutRouter().searchParams
}

export interface LayoutLinkProps {
  readonly href: string
  readonly className?: string
  readonly children: ReactNode
  readonly title?: string
  readonly onClick?: () => void
  readonly "aria-current"?:
    | boolean
    | "false"
    | "true"
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
}

const LayoutLinkContext = createContext<ComponentType<LayoutLinkProps> | null>(null)

export function LayoutLinkProvider({
  component,
  children,
}: {
  component: ComponentType<LayoutLinkProps>
  children: ReactNode
}) {
  return <LayoutLinkContext.Provider value={component}>{children}</LayoutLinkContext.Provider>
}

export function LayoutLink(props: LayoutLinkProps) {
  const Component = useContext(LayoutLinkContext)
  if (Component === null) {
    throw new Error(
      "Missing <LayoutLinkProvider>. Mount it in your app-shell with the host's `Link` component (react-router's `Link`)."
    )
  }
  return <Component {...props} />
}
