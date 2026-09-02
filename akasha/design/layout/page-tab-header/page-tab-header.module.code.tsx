import { cn } from "@akasha/design-primitives/cn"

export function PageTabTitleBadges({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-tab-title-badges"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

interface PageTabHeaderProps {
  title: string
  titleTrailing?: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function PageTabHeader({
  title,
  titleTrailing,
  subtitle,
  children,
  className,
}: PageTabHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        {}
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="hidden min-w-0 cursor-default select-none truncate font-semibold text-primary text-xl sm:block">
            {title}
          </h2>
          {titleTrailing}
        </div>
        {children != null && (
          <div className="ml-auto flex shrink-0 items-center gap-2">{children}</div>
        )}
      </div>
      {subtitle}
    </div>
  )
}
