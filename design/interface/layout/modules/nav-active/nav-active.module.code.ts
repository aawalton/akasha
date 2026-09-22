export function isNavItemActive(
  pathname: string,
  item: { href?: string; activePrefix?: string; external?: boolean }
): boolean {
  if (item.external === true || item.href == null) return false
  if (item.href === "/" && item.activePrefix == null) return pathname === "/"
  const prefix = item.activePrefix ?? item.href
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}
