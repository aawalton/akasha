"use client"

import {
  type ComponentType,
  createContext,
  type MouseEvent,
  type ReactNode,
  useContext,
} from "react"

export interface PagesUIRouter {
  readonly pathname: string
  readonly push: (href: string) => void
  readonly replace: (href: string) => void
}

const PagesUIRouterContext = createContext<PagesUIRouter | null>(null)

export function PagesUIRouterProvider({
  value,
  children,
}: {
  value: PagesUIRouter
  children: ReactNode
}) {
  return <PagesUIRouterContext.Provider value={value}>{children}</PagesUIRouterContext.Provider>
}

export function usePagesUIRouter(): PagesUIRouter {
  const value = useContext(PagesUIRouterContext)
  if (value === null) {
    throw new Error(
      "Missing <PagesUIRouterProvider>. Mount it in your app-shell with a value derived from the host router (react-router)."
    )
  }
  return value
}

export interface PagesUILinkProps {
  readonly href: string
  readonly className?: string
  readonly children: ReactNode
  readonly onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
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

const PagesUILinkContext = createContext<ComponentType<PagesUILinkProps> | null>(null)

export function PagesUILinkProvider({
  component,
  children,
}: {
  component: ComponentType<PagesUILinkProps>
  children: ReactNode
}) {
  return <PagesUILinkContext.Provider value={component}>{children}</PagesUILinkContext.Provider>
}

export function PagesUILink(props: PagesUILinkProps) {
  const Component = useContext(PagesUILinkContext)
  if (Component === null) {
    throw new Error(
      "Missing <PagesUILinkProvider>. Mount it in your app-shell with the host's `Link` component (react-router's `Link`)."
    )
  }
  return <Component {...props} />
}
