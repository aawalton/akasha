import {
  type LayoutLinkProps,
  LayoutLinkProvider,
  type LayoutRouter,
  LayoutRouterProvider,
} from "@akasha/design-layout/router-context"
import {
  type PagesUILinkProps,
  PagesUILinkProvider,
  PagesUIRouterProvider,
} from "@akasha/pages-ui/navigation-context"
import { type ReactNode, useMemo } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router"

function PagesUILinkAdapter({ href, ...rest }: PagesUILinkProps) {
  return <Link to={href} {...rest} />
}

function LayoutLinkAdapter({ href, ...rest }: LayoutLinkProps) {
  return <Link to={href} {...rest} />
}

export function PagesUISeam({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const value = useMemo(
    () => ({
      pathname,
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [pathname, navigate]
  )
  return (
    <PagesUIRouterProvider value={value}>
      <PagesUILinkProvider component={PagesUILinkAdapter}>{children}</PagesUILinkProvider>
    </PagesUIRouterProvider>
  )
}

export function LayoutSeam({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const layoutValue = useMemo<LayoutRouter>(
    () => ({
      pathname,
      searchParams: {
        get: (name: string) => searchParams.get(name),
        toString: () => searchParams.toString(),
      },
    }),
    [pathname, searchParams]
  )
  return (
    <LayoutRouterProvider value={layoutValue}>
      <LayoutLinkProvider component={LayoutLinkAdapter}>{children}</LayoutLinkProvider>
    </LayoutRouterProvider>
  )
}
