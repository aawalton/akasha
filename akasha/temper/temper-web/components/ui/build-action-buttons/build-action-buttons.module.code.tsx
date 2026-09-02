import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { Copy, Menu, Search, Target } from "lucide-react"

interface BuildActionButtonsProps {
  onRemix: () => void
  onSetTarget?: () => void
  browseHref?: string
  remixDisabled?: boolean
}

export function BuildActionButtons({
  onRemix,
  onSetTarget,
  browseHref,
  remixDisabled,
}: BuildActionButtonsProps) {
  const actions = [
    ...(onSetTarget
      ? [{ key: "setTarget", label: "Set Target", icon: Target, handler: onSetTarget }]
      : []),
    { key: "remix", label: "Remix", icon: Copy, handler: onRemix },
  ]

  return (
    <div className="flex shrink-0 items-center gap-2">
      {}
      <div className="@[640px]:flex hidden items-center gap-2">
        {browseHref != null && (
          <Button variant="secondary" size="sm" className={cn("gap-2", surfaceClass(1))} asChild>
            <Link href={browseHref}>
              <Search className="h-4 w-4" />
              <span className="@[1016px]:inline hidden">Browse</span>
            </Link>
          </Button>
        )}
        {actions.map(({ key, label, icon: Icon, handler }) => (
          <Button
            key={key}
            variant="secondary"
            size="sm"
            className={cn("gap-2", surfaceClass(1))}
            disabled={key === "remix" ? remixDisabled : undefined}
            onClick={handler}
          >
            <Icon className="h-4 w-4" />
            <span className="@[1016px]:inline hidden">{label}</span>
          </Button>
        ))}
      </div>

      {}
      <div className="@[640px]:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" className={surfaceClass(1)}>
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {browseHref != null && (
              <DropdownMenuItem asChild>
                <Link href={browseHref}>
                  <Search className="h-4 w-4" />
                  Browse
                </Link>
              </DropdownMenuItem>
            )}
            {actions.map(({ key, label, icon: Icon, handler }) => (
              <DropdownMenuItem
                key={key}
                onClick={handler}
                disabled={key === "remix" ? remixDisabled : undefined}
              >
                <Icon className="h-4 w-4" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
