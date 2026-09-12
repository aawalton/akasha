export function CardField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[2px]">
      <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.16em]">{label}</div>
      <div className="text-[13px] text-secondary leading-[1.5]">{value}</div>
    </div>
  )
}
