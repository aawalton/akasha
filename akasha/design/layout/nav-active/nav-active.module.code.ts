export function isNavItemActive(
  pathname: string,
  item: { href?: string; activePrefix?: string; external?: boolean }
): boolean {
  if (item.external === true || item.href == null) return false
  if (item.href === "/" && item.activePrefix == null) return pathname === "/"
  return pathname.startsWith(item.activePrefix ?? item.href)
}
